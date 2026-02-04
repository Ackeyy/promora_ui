import { NextRequest } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { errorResponse, jsonResponse } from '@/lib/auth';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(1).max(100).optional(),
  role: z.enum(['creator', 'host']),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.message, 400);
    }
    const { email, password, name, role } = parsed.data;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return errorResponse('Email already registered', 409);
    const passwordHash = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name: name ?? email.split('@')[0],
        passwordHash,
      },
    });
    await prisma.profile.create({
      data: {
        userId: user.id,
        creatorEnabled: role === 'creator',
        hostEnabled: role === 'host',
        modeType: role === 'creator' ? 'CREATOR' : 'HOST',
        lastRoleUsed: role === 'creator' ? 'CREATOR' : 'HOST',
        roleType: 'USER',
        onboardingDone: false,
      },
    });
    return jsonResponse({
      data: { id: user.id, email: user.email, name: user.name },
    });
  } catch (e) {
    console.error(e);
    return errorResponse('Signup failed', 500);
  }
}
