const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

async function getCsrf(): Promise<string> {
  const res = await fetch(`${API_BASE}/api/auth/csrf`, { credentials: 'include' });
  const data = await res.json();
  return data.csrfToken ?? '';
}

/**
 * Login with email/password. Uses NextAuth credentials flow.
 * On success, session cookie is set; call api.getMe() to get user.
 */
export async function login(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
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
  if (data.error) return { ok: false, error: data.error };
  if (!res.ok) return { ok: false, error: 'Login failed' };
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
