import { NextRequest } from 'next/server';
import { requireAuth, errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { prisma } from '@/lib/db';

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
  hostId: string;
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
    hostId: c.hostId,
    host: {
      name: c.host.profile?.companyName ?? c.host.name ?? c.host.email,
      email: c.host.email,
      verifiedBadge: c.host.profile?.verifiedBadge ?? false,
    },
    creatorCount: c._count.participations,
  };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        host: { select: { name: true, email: true, profile: { select: { verifiedBadge: true, companyName: true } } } },
        _count: { select: { participations: true } },
      },
    });
    if (!campaign) return errorResponse('Campaign not found', 404);
    const userId = await requireAuth().then((u) => u.id).catch(() => null);
    if (campaign.hostId !== userId) {
      if (campaign.status !== 'ACTIVE') return errorResponse('Campaign not found', 404);
    }
    return jsonResponse({ data: campaignToJson(campaign) });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    throw e;
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await requireAuth();
    const { id: campaignId } = await params;
    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign) return errorResponse('Campaign not found', 404);
    if (campaign.hostId !== id) return errorResponse('Forbidden', 403);
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (body.title != null) data.title = body.title;
    if (body.description != null) data.description = body.description;
    if (body.thumbnail != null) data.thumbnail = body.thumbnail;
    if (body.platforms != null) data.platforms = body.platforms;
    if (body.ratePer1kViewsPaise != null) data.ratePer1kViewsPaise = body.ratePer1kViewsPaise;
    if (body.endAt != null) data.endAt = new Date(body.endAt);
    const updated = await prisma.campaign.update({
      where: { id: campaignId },
      data,
    });
    return jsonResponse({ data: campaignToJson(updated) });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    throw e;
  }
}
