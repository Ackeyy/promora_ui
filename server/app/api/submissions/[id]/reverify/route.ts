import { NextRequest } from 'next/server';
import { requireAuth, errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { createReverifyRequest } from '@/services/submission';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await requireAuth();
    const { id: submissionId } = await params;
    const vr = await createReverifyRequest(submissionId, id);
    return jsonResponse({ data: { id: vr.id } });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    if (e instanceof Error) return errorResponse(e.message, 400);
    throw e;
  }
}
