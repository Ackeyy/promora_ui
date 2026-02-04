import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { depositCampaignBudget } from '@/services/campaign';
import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET ?? '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature') ?? '';
    if (WEBHOOK_SECRET && signature) {
      const expected = crypto.createHmac('sha256', WEBHOOK_SECRET).update(body).digest('hex');
      if (signature !== expected) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    const payload = JSON.parse(body);
    const event = payload.event;
    if (event === 'payment.captured') {
      const payment = payload.payload?.payment?.entity;
      const notes = payment?.notes ?? {};
      const campaignId = notes.campaignId;
      const amountPaise = payment?.amount ?? 0;
      if (campaignId && amountPaise > 0) {
        const idempotencyKey = `rp_${payment?.id ?? payload.payload?.payment?.id ?? Date.now()}`;
        await depositCampaignBudget(campaignId, amountPaise, idempotencyKey);
      }
    }
    return NextResponse.json({ received: true });
  } catch (e) {
    console.error('Razorpay webhook error', e);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
