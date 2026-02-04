import { NextRequest } from 'next/server';
import { requireAuth, errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { submitContent } from '@/services/submission';
import { submitContentSchema } from '@/validators/campaign';

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
    const { id } = await requireAuth();
    const { id: campaignId } = await params;
    const body = await req.json();
    const parsed = submitContentSchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400);
    const submission = await submitContent(campaignId, id, parsed.data);
    return jsonResponse({ data: submissionToJson(submission) });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    if (e instanceof Error) return errorResponse(e.message, 400);
    throw e;
  }
}
