import { NextRequest } from 'next/server';
import { z } from 'zod';
import { requireAuth, errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { prisma } from '@/lib/db';

const bodySchema = z.object({
  companyName: z.string().min(1).max(200),
  website: z.string().url().max(500).optional().or(z.literal('')),
  businessType: z.string().max(100).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const { id } = await requireAuth();
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400);
    const { companyName, website, businessType } = parsed.data;
    const profile = await prisma.profile.findUnique({ where: { userId: id } });
    const modeType = profile?.creatorEnabled ? 'POLYCODE' : 'HOST';
    await prisma.profile.updateMany({
      where: { userId: id },
      data: {
        hostEnabled: true,
        companyName,
        website: website || undefined,
        hostBusinessType: businessType,
        modeType,
        lastRoleUsed: 'HOST',
        onboardingDone: true,
      },
    });
    return jsonResponse({ data: { ok: true } });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    throw e;
  }
}
