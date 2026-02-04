import { NextRequest } from 'next/server';
import { errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { createPayoutForCreator } from '@/services/payout';
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

const bodySchema = z.object({ creatorId: z.string().min(1) });

export async function POST(req: NextRequest) {
  try {
    const adminId = await requireAdmin();
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400);
    const payout = await createPayoutForCreator(parsed.data.creatorId, adminId);
    return jsonResponse({
      data: {
        id: payout.id,
        creatorId: payout.creatorId,
        amountPaise: payout.amountPaise,
        status: payout.status,
        items: payout.items,
      },
    });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    if (e instanceof Error) return errorResponse(e.message, 400);
    throw e;
  }
}
