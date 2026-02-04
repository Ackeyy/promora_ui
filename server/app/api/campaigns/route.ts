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
  videoUrl: string | null;
  campaignType: string | null;
  productType: string | null;
  productLink: string | null;
  reviewContent: boolean;
  platforms: string[];
  platformRates: unknown;
  ratePer1kViewsPaise: number;
  tags: string[];
  requirements: string[];
  startAt: Date | null;
  endAt: Date | null;
  status: string;
  budgetTotalPaise: number;
  budgetReservedPaise: number;
  budgetSpentPaise: number;
  createdAt: Date;
  host: {
    name: string | null;
    email: string;
    profile: { verifiedBadge: boolean; companyName: string | null } | null;
  };
  _count: { participations: number };
}) {
  return {
    id: c.id,
    title: c.title,
    description: c.description,
    thumbnail: c.thumbnail ?? undefined,
    videoUrl: c.videoUrl ?? undefined,
    campaignType: c.campaignType ?? undefined,
    productType: c.productType ?? undefined,
    productLink: c.productLink ?? undefined,
    reviewContent: c.reviewContent,
    platforms: c.platforms,
    platformRates: (c.platformRates as Record<string, number> | null) ?? undefined,
    ratePer1kViewsPaise: c.ratePer1kViewsPaise,
    tags: c.tags,
    requirements: c.requirements,
    startAt: c.startAt?.toISOString() ?? '',
    endAt: c.endAt?.toISOString() ?? '',
    status: c.status,
    budgetTotalPaise: c.budgetTotalPaise,
    budgetReservedPaise: c.budgetReservedPaise,
    budgetSpentPaise: c.budgetSpentPaise,
    createdAt: c.createdAt.toISOString(),
    host: {
      name: c.host.profile?.companyName ?? c.host.name ?? c.host.email,
      email: c.host.email,
      verifiedBadge: c.host.profile?.verifiedBadge ?? false,
    },
    creatorCount: c._count.participations,
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
      include: {
        host: { select: { name: true, email: true, profile: { select: { verifiedBadge: true, companyName: true } } } },
        _count: { select: { participations: true } },
      },
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
