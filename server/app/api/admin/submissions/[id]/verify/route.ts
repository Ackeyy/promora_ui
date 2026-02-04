import { NextRequest } from 'next/server';
import { errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { adminVerifySubmission } from '@/services/verification';
import { adminVerifySchema } from '@/validators/campaign';

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
  };
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminId = await requireAdmin();
    const { id: submissionId } = await params;
    const body = await req.json();
    const parsed = adminVerifySchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400);
    const submission = await adminVerifySubmission(submissionId, adminId, parsed.data);
    return jsonResponse({ data: submissionToJson(submission) });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    if (e instanceof Error) return errorResponse(e.message, 400);
    throw e;
  }
}
