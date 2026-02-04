const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export type AuthErrorCode = 'USER_NOT_FOUND' | 'INVALID_PASSWORD' | 'UNEXPECTED_ERROR';

async function validateCredentials(email: string, password: string): Promise<{ ok: boolean; errorCode?: AuthErrorCode }> {
  try {
    const res = await fetch(`${API_BASE}/api/auth/credentials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    if (res.ok) return { ok: true };
    const data = await res.json().catch(() => ({}));
    const errorCode = (data.code ?? data.message ?? 'UNEXPECTED_ERROR') as AuthErrorCode;
    if (errorCode === 'USER_NOT_FOUND' || errorCode === 'INVALID_PASSWORD') {
      return { ok: false, errorCode };
    }
    return { ok: false, errorCode: 'UNEXPECTED_ERROR' };
  } catch {
    return { ok: false, errorCode: 'UNEXPECTED_ERROR' };
  }
}

async function getCsrf(): Promise<string> {
  const res = await fetch(`${API_BASE}/api/auth/csrf`, { credentials: 'include' });
  const data = await res.json();
  return data.csrfToken ?? '';
}

/**
 * Login with email/password. Uses NextAuth credentials flow.
 * On success, session cookie is set; call api.getMe() to get user.
 */
export async function login(email: string, password: string): Promise<{ ok: boolean; errorCode?: AuthErrorCode }> {
  const validation = await validateCredentials(email, password);
  if (!validation.ok) {
    return { ok: false, errorCode: validation.errorCode };
  }
  const csrfToken = await getCsrf();
  const body = new URLSearchParams({
    email,
    password,
    csrfToken,
    callbackUrl: '/',
    json: 'true',
  });
  const res = await fetch(`${API_BASE}/api/auth/callback/credentials`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  if (data.url) return { ok: true };
  if (data.error) {
    const errorCode = data.error as AuthErrorCode;
    if (errorCode === 'USER_NOT_FOUND' || errorCode === 'INVALID_PASSWORD' || errorCode === 'UNEXPECTED_ERROR') {
      return { ok: false, errorCode };
    }
    return { ok: false, errorCode: 'UNEXPECTED_ERROR' };
  }
  if (!res.ok) return { ok: false, errorCode: 'UNEXPECTED_ERROR' };
  return { ok: true };
}

export async function logout(): Promise<void> {
  await fetch(`${API_BASE}/api/auth/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ callbackUrl: '/', json: 'true' }).toString(),
  });
}
