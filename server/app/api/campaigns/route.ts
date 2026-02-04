import { NextRequest } from 'next/server';
import { requireAuth, errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { createCampaign } from '@/services/campaign';
import { createCampaignSchema } from '@/validators/campaign';

function campaignToJson(c: {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  platforms: string[];
  ratePer1kViewsPaise: number;
  startAt: Date | null;
  endAt: Date | null;
  status: string;
  budgetTotalPaise: number;
  budgetReservedPaise: number;
  budgetSpentPaise: number;
}) {
  return {
    id: c.id,
    title: c.title,
    description: c.description,
    thumbnail: c.thumbnail ?? undefined,
    platforms: c.platforms,
    ratePer1kViewsPaise: c.ratePer1kViewsPaise,
    startAt: c.startAt?.toISOString() ?? '',
    endAt: c.endAt?.toISOString() ?? '',
    status: c.status,
    budgetTotalPaise: c.budgetTotalPaise,
    budgetReservedPaise: c.budgetReservedPaise,
    budgetSpentPaise: c.budgetSpentPaise,
  };
}

export async function GET(req: NextRequest) {
  try {
    const { getCurrentUserId } = await import('@/lib/auth');
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') ?? 'ACTIVE';
    const hostIdMe = searchParams.get('hostId') === 'me';
    const where: { status?: string; hostId?: string } = {};
    if (status) where.status = status;
    if (hostIdMe && userId) where.hostId = userId;
    const list = await prisma.campaign.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return jsonResponse({ data: list.map(campaignToJson) });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    throw e;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id } = await requireAuth();
    const body = await req.json();
    const parsed = createCampaignSchema.safeParse({
      ...body,
      ratePer1kViewsPaise: body.ratePer1kViewsPaise ?? Math.round((body.ratePer1kViewsPaise ?? 50) * 100),
    });
    if (!parsed.success) return errorResponse(parsed.error.message, 400);
    const campaign = await createCampaign(id, parsed.data);
    return jsonResponse({ data: campaignToJson(campaign) });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    throw e;
  }
}
