import { NextRequest } from 'next/server';
import { errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { markPayoutPaid } from '@/services/payout';
import { z } from 'zod';

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

const bodySchema = z.object({
  referenceId: z.string().min(1).max(100),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminId = await requireAdmin();
    const { id: payoutId } = await params;
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    const referenceId = parsed.success ? parsed.data.referenceId : `SIMUTR-${Date.now()}`;
    const payout = await markPayoutPaid(payoutId, adminId, referenceId);
    return jsonResponse({
      data: {
        id: payout.id,
        status: payout.status,
        referenceId: payout.referenceId,
      },
    });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    if (e instanceof Error) return errorResponse(e.message, 400);
    throw e;
  }
}
