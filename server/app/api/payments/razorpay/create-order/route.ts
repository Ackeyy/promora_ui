import { NextRequest } from 'next/server';
import { requireAuth, errorResponse, jsonResponse, ApiError } from '@/lib/auth';
import { depositCampaignBudget } from '@/services/campaign';
import { z } from 'zod';

const bodySchema = z.object({
  campaignId: z.string().min(1),
  amountPaise: z.number().int().min(50000),
});

// MVP: returns order id. Set SIMULATE_RAZORPAY=true to also credit campaign (e.g. for "extend budget" without real payment).
const SIMULATE_PAYMENT = process.env.SIMULATE_RAZORPAY === 'true';

export async function POST(req: NextRequest) {
  try {
    const { id } = await requireAuth();
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message, 400);
    const { campaignId, amountPaise } = parsed.data;
    if (SIMULATE_PAYMENT) {
      const idempotencyKey = `sim-${campaignId}-${Date.now()}`;
      await depositCampaignBudget(campaignId, amountPaise, idempotencyKey, id);
    }
    const orderId = `order_${Date.now()}`;
    return jsonResponse({
      data: {
        id: orderId,
        amountPaise,
        currency: 'INR',
        receipt: `rcpt_${campaignId}_${Date.now()}`,
      },
    });
  } catch (e) {
    if (e instanceof ApiError) return errorResponse(e.message, e.status);
    if (e instanceof Error) return errorResponse(e.message, 400);
    throw e;
  }
}
