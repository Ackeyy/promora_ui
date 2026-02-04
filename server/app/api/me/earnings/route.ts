import { requireAuth, errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const { id } = await requireAuth();
    const submissions = await prisma.submission.findMany({
      where: { creatorId: id },
      include: { campaign: true },
    });
    let pendingPaise = 0;
    let totalPaidPaise = 0;
    for (const s of submissions) {
      if (s.status !== 'ACTIVE') continue;
      const deltaViews = s.lastVerifiedViewsTotal - s.paidViewsTotal;
      const units = Math.floor(deltaViews / 1000);
      if (units > 0 && s.payoutStatus === 'UNPAID') {
        pendingPaise += units * s.campaign.ratePer1kViewsPaise;
      }
    }
    const payouts = await prisma.payout.findMany({
      where: { creatorId: id, status: 'PAID' },
    });
    totalPaidPaise = payouts.reduce((sum, p) => sum + p.amountPaise, 0);
    return jsonResponse({
      data: {
        availablePaise: totalPaidPaise,
        pendingPaise,
        totalPaidPaise,
      },
    });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    throw e;
  }
}
