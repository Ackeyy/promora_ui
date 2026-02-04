import { prisma } from '@/lib/db';

export type LedgerType = 'DEPOSIT' | 'RESERVE' | 'RELEASE_RESERVE' | 'PAYOUT_PAID' | 'FEE';

export async function createLedgerEntry(params: {
  type: LedgerType;
  campaignId?: string;
  submissionId?: string;
  payoutId?: string;
  amountPaise: number;
  idempotencyKey?: string;
  createdById?: string;
}) {
  return prisma.ledgerEntry.create({
    data: {
      type: params.type,
      campaignId: params.campaignId,
      submissionId: params.submissionId,
      payoutId: params.payoutId,
      amountPaise: params.amountPaise,
      idempotencyKey: params.idempotencyKey,
      createdById: params.createdById,
    },
  });
}
