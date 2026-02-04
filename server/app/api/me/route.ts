import { requireAuth, errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const { id } = await requireAuth();
    const user = await prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
    if (!user?.profile) {
      return errorResponse('Profile not found', 404);
    }
    const p = user.profile;
    const onboardingComplete = p.onboardingDone ?? false;
    return jsonResponse({
      data: {
        id: user.id,
        email: user.email,
        name: user.name ?? undefined,
        avatarUrl: user.image ?? undefined,
        roleType: p.roleType,
        modeType: p.modeType,
        lastRoleUsed: p.lastRoleUsed ?? undefined,
        roleMode: {
          creatorEnabled: p.creatorEnabled,
          hostEnabled: p.hostEnabled,
        },
        hostProfile: p.companyName || p.website || p.verifiedBadge ? {
          companyName: p.companyName ?? undefined,
          website: p.website ?? undefined,
          verifiedBadge: p.verifiedBadge,
        } : undefined,
        onboardingComplete,
        adminEnabled: p.adminEnabled,
      },
    });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    throw e;
  }
}

export async function PATCH(req: Request) {
  try {
    const { id } = await requireAuth();
    const body = await req.json();
    const updates: { name?: string; image?: string } = {};
    const profileUpdates: { companyName?: string; website?: string; lastRoleUsed?: 'CREATOR' | 'HOST' } = {};
    if (body.name != null) updates.name = String(body.name);
    if (body.avatarUrl != null) updates.image = String(body.avatarUrl);
    if (body.lastRoleUsed === 'CREATOR' || body.lastRoleUsed === 'HOST') {
      profileUpdates.lastRoleUsed = body.lastRoleUsed;
    }
    await prisma.user.update({
      where: { id },
      data: updates,
    });
    if (body.companyName != null) profileUpdates.companyName = String(body.companyName);
    if (body.website != null) profileUpdates.website = String(body.website);
    if (Object.keys(profileUpdates).length > 0) {
      await prisma.profile.updateMany({
        where: { userId: id },
        data: profileUpdates,
      });
    }
    const user = await prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
    if (!user?.profile) return errorResponse('Profile not found', 404);
    const p = user.profile;
    return jsonResponse({
      data: {
        id: user.id,
        email: user.email,
        name: user.name ?? undefined,
        avatarUrl: user.image ?? undefined,
        roleType: p.roleType,
        modeType: p.modeType,
        lastRoleUsed: p.lastRoleUsed ?? undefined,
        roleMode: { creatorEnabled: p.creatorEnabled, hostEnabled: p.hostEnabled },
        hostProfile: { companyName: p.companyName ?? undefined, website: p.website ?? undefined, verifiedBadge: p.verifiedBadge },
        onboardingComplete: p.onboardingDone,
      },
    });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    throw e;
  }
}
