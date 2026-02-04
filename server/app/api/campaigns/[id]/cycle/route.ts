import { NextRequest } from 'next/server';
import { errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const campaign = await prisma.campaign.findUnique({ where: { id } });
    if (!campaign) return errorResponse('Campaign not found', 404);
    const startAt = campaign.startAt ?? new Date();
    const cycleHours = campaign.cycleHours ?? 48;
    const cycleMs = cycleHours * 3600 * 1000;
    const cycleIndex = Math.floor((Date.now() - startAt.getTime()) / cycleMs);
    const nextWindowAt = new Date(startAt.getTime() + (cycleIndex + 1) * cycleMs);
    return jsonResponse({
      data: {
        cycleIndex: Math.max(0, cycleIndex),
        nextWindowAt: nextWindowAt.toISOString(),
      },
    });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    throw e;
  }
}
