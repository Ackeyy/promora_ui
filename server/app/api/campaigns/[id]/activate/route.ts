import { NextRequest } from 'next/server';
import { requireAuth, errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { activateCampaign } from '@/services/campaign';
import { prisma } from '@/lib/db';

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

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await requireAuth();
    const { id: campaignId } = await params;
    const campaign = await activateCampaign(campaignId, id);
    return jsonResponse({ data: campaignToJson(campaign) });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    if (e instanceof Error) return errorResponse(e.message, 400);
    throw e;
  }
}
