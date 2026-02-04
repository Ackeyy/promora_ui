import { NextRequest } from 'next/server';
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

async function requireAdmin() {
  const { getSession } = await import('@/lib/auth');
  const session = await getSession();
  if (!session?.user?.id) throw new ApiError('Unauthorized', 401);
  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
  });
  if (!profile?.adminEnabled) throw new ApiError('Forbidden', 403);
  return session.user.id;
}

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') ?? 'PENDING_HOST_APPROVAL';
    const list = await prisma.submission.findMany({
      where: { status },
      include: { campaign: { select: { title: true, ratePer1kViewsPaise: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return jsonResponse({ data: list.map(submissionToJson) });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    throw e;
  }
}
