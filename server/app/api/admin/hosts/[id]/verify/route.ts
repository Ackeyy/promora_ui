import { NextRequest } from 'next/server';
import { errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { prisma } from '@/lib/db';

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

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id: hostUserId } = await params;
    await prisma.profile.updateMany({
      where: { userId: hostUserId },
      data: { verifiedBadge: true },
    });
    return jsonResponse({ data: { ok: true } });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    throw e;
  }
}
