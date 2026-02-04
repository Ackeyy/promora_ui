import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export async function getSession() {
  return getServerSession(authOptions);
}

export async function getCurrentUserId(): Promise<string | null> {
  const session = await getSession();
  return session?.user?.id ?? null;
}

export async function requireAuth(): Promise<{ id: string; email: string; name?: string | null }> {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new ApiError('Unauthorized', 401);
  }
  return { id: session.user.id, email: session.user.email!, name: session.user.name ?? null };
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 400,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function jsonResponse<T>(data: T, status: number = 200): Response {
  return Response.json(data, { status });
}

export function errorResponse(message: string, status: number = 400, code?: string): Response {
  return Response.json({ message, code }, { status });
}
