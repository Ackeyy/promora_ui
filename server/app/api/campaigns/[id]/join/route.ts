import { NextRequest } from 'next/server';
import { requireAuth, errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { joinCampaign } from '@/services/submission';
import { joinCampaignSchema } from '@/validators/campaign';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await requireAuth();
    const { id: campaignId } = await params;
    const body = await req.json();
    const platforms = Array.isArray(body.platforms) ? body.platforms : [];
    const handles = typeof body.handles === 'object' && body.handles !== null ? body.handles : {};
    const parsed = joinCampaignSchema.safeParse({ platforms, handles });
    if (!parsed.success) return errorResponse(parsed.error.message, 400);
    const participation = await joinCampaign(campaignId, id, parsed.data.platforms, parsed.data.handles);
    return jsonResponse({
      data: {
        id: participation.id,
        campaignId: participation.campaignId,
        creatorId: participation.creatorId,
        platforms: participation.platforms,
        status: participation.status,
        eligibleUntil: participation.eligibleUntil?.toISOString() ?? '',
      },
    });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    if (e instanceof Error) return errorResponse(e.message, 400);
    throw e;
  }
}
