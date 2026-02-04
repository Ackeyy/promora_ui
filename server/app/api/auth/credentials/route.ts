import { compare } from 'bcryptjs';
import { prisma } from '@/lib/db';
import { errorResponse, jsonResponse } from '@/lib/auth';

export async function POST(req: Request) {
  let email: string | null = null;
  try {
    const body = await req.json();
    email = typeof body.email === 'string' ? body.email : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!email || !password) {
      return errorResponse('Missing credentials', 400, 'MISSING_CREDENTIALS');
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, passwordHash: true },
    });

    if (!user?.passwordHash) {
      return errorResponse('User not found', 404, 'USER_NOT_FOUND');
    }

    const ok = await compare(password, user.passwordHash);
    if (!ok) {
      return errorResponse('Invalid password', 401, 'INVALID_PASSWORD');
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    await prisma.authErrorLog.create({
      data: {
        email,
        message: error instanceof Error ? error.message : 'UNEXPECTED_ERROR',
        stack: error instanceof Error ? error.stack ?? null : null,
        context: { source: 'credentials-validate' },
      },
    });
    return errorResponse('Unexpected error', 500, 'UNEXPECTED_ERROR');
  }
}
