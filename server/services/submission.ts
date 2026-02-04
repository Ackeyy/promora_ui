import { prisma } from '@/lib/db';
import type { SubmitContentInput } from '@/validators/campaign';

const PLATFORM_MAP: Record<string, string> = {
  youtube: 'YOUTUBE',
  instagram: 'INSTAGRAM',
  facebook: 'FACEBOOK',
  YOUTUBE: 'YOUTUBE',
  INSTAGRAM: 'INSTAGRAM',
  FACEBOOK: 'FACEBOOK',
};

function normalizePlatform(p: string): string {
  return PLATFORM_MAP[p] ?? p.toUpperCase();
}

export async function joinCampaign(
  campaignId: string,
  creatorId: string,
  platforms: string[],
  handles: Record<string, string>
) {
  const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
  if (!campaign) throw new Error('Campaign not found');
  if (campaign.status !== 'ACTIVE') throw new Error('Only active campaigns can be joined');
  const normalizedPlatforms = platforms.map(normalizePlatform);
  const handlesNormalized: Record<string, string> = {};
  for (const [k, v] of Object.entries(handles)) {
    if (v && typeof v === 'string') handlesNormalized[normalizePlatform(k)] = v;
  }
  const eligibleUntil = new Date(Date.now() + (campaign.submissionEligibilityDays || 30) * 24 * 60 * 60 * 1000);
  const participation = await prisma.participation.upsert({
    where: {
      campaignId_creatorId: { campaignId, creatorId },
    },
    create: {
      campaignId,
      creatorId,
      platforms: normalizedPlatforms,
      handles: handlesNormalized,
      eligibleUntil,
    },
    update: {
      platforms: normalizedPlatforms,
      handles: handlesNormalized,
      eligibleUntil,
      status: 'ACTIVE',
    },
  });
  return participation;
}

export async function submitContent(
  campaignId: string,
  creatorId: string,
  input: SubmitContentInput
) {
  const platform = normalizePlatform(input.platform);
  const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
  if (!campaign) throw new Error('Campaign not found');
  if (campaign.status !== 'ACTIVE') throw new Error('Only active campaigns accept submissions');
  const participation = await prisma.participation.findUnique({
    where: { campaignId_creatorId: { campaignId, creatorId } },
  });
  if (!participation) throw new Error('You must join the campaign first');
  if (!participation.platforms.includes(platform)) throw new Error('Platform not selected at join');
  const handle = (participation.handles as Record<string, string>)?.[platform] ?? '';
  if (!handle) throw new Error('Handle not set for this platform');
  const existing = await prisma.submission.findFirst({
    where: { campaignId, creatorId, reelUrl: input.reelUrl },
  });
  if (existing) throw new Error('Duplicate submission URL for this campaign');
  const eligibleUntil = new Date(Date.now() + (campaign.submissionEligibilityDays || 30) * 24 * 60 * 60 * 1000);
  const submission = await prisma.submission.create({
    data: {
      campaignId,
      creatorId,
      participationId: participation.id,
      platform,
      handle,
      reelUrl: input.reelUrl,
      status: 'PENDING_HOST_APPROVAL',
      eligibleUntil,
    },
  });
  return submission;
}

export async function createReverifyRequest(submissionId: string, creatorId: string) {
  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    include: { campaign: true },
  });
  if (!submission) throw new Error('Submission not found');
  if (submission.creatorId !== creatorId) throw new Error('Forbidden');
  if (submission.status !== 'ACTIVE') throw new Error('Only active submissions can be re-verified');
  if (submission.eligibleUntil && new Date() > submission.eligibleUntil) {
    throw new Error('Eligibility window ended');
  }
  const cycleIndex = Math.floor(
    (Date.now() - submission.campaign.startAt!.getTime()) / (submission.campaign.cycleHours * 3600 * 1000)
  );
  if (cycleIndex < 0) throw new Error('Campaign not started');
  const existing = await prisma.verificationRequest.findUnique({
    where: { submissionId_cycleIndex: { submissionId, cycleIndex } },
  });
  if (existing) throw new Error('Already requested for this cycle');
  return prisma.verificationRequest.create({
    data: { submissionId, cycleIndex, status: 'PENDING' },
  });
}
