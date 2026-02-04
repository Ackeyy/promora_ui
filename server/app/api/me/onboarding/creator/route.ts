import { NextRequest } from 'next/server';
import { z } from 'zod';
import { requireAuth, errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { prisma } from '@/lib/db';

const bodySchema = z.object({
  platforms: z.array(z.string()).min(1),
  contentTypes: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const { id } = await requireAuth();
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400);
    const { platforms, contentTypes } = parsed.data;
    const profile = await prisma.profile.findUnique({ where: { userId: id } });
    const modeType = profile?.hostEnabled ? 'POLYCODE' : 'CREATOR';
    await prisma.profile.updateMany({
      where: { userId: id },
      data: {
        creatorEnabled: true,
        creatorPlatforms: platforms,
        creatorContentTypes: contentTypes ?? [],
        modeType,
        lastRoleUsed: 'CREATOR',
        onboardingDone: true,
      },
    });
    return jsonResponse({ data: { ok: true } });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    throw e;
  }
}
