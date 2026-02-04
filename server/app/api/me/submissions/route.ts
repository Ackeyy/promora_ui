import { requireAuth, errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { prisma } from '@/lib/db';

function submissionToJson(s: {
  id: string;
  campaignId: string;
  creatorId: string;
  platform: string;
  handle: string;
  reelUrl: string;
  status: string;
  eligibleUntil: Date | null;
  paidViewsTotal: number;
  lastVerifiedViewsTotal: number;
  lastVerifiedCycleIndex: number;
  payoutStatus: string;
  campaign?: { title: string; ratePer1kViewsPaise: number } | null;
}) {
  return {
    id: s.id,
    campaignId: s.campaignId,
    creatorId: s.creatorId,
    platform: s.platform,
    handle: s.handle,
    reelUrl: s.reelUrl,
    status: s.status,
    eligibleUntil: s.eligibleUntil?.toISOString() ?? '',
    paidViewsTotal: s.paidViewsTotal,
    lastVerifiedViewsTotal: s.lastVerifiedViewsTotal,
    lastVerifiedCycleIndex: s.lastVerifiedCycleIndex,
    payoutStatus: s.payoutStatus,
    campaignTitle: s.campaign?.title,
    ratePer1kViewsPaise: s.campaign?.ratePer1kViewsPaise,
  };
}

export async function GET() {
  try {
    const { id } = await requireAuth();
    const list = await prisma.submission.findMany({
      where: { creatorId: id },
      include: { campaign: { select: { title: true, ratePer1kViewsPaise: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return jsonResponse({ data: list.map(submissionToJson) });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    throw e;
  }
}
