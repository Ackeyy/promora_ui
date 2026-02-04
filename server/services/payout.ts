import { prisma } from '@/lib/db';
import { createLedgerEntry } from './ledger';

export async function createPayoutForCreator(creatorId: string, adminId: string) {
  const unpaid = await prisma.submission.findMany({
    where: {
      creatorId,
      status: 'ACTIVE',
      payoutStatus: 'UNPAID',
    },
    include: { campaign: true },
  });
  if (unpaid.length === 0) throw new Error('No unpaid approved submissions');
  let totalPaise = 0;
  const items: { submissionId: string; amountPaise: number; viewsPaid: number }[] = [];
  for (const s of unpaid) {
    const deltaViews = s.lastVerifiedViewsTotal - s.paidViewsTotal;
    const units = Math.floor(deltaViews / 1000);
    if (units <= 0) continue;
    const amount = units * s.campaign.ratePer1kViewsPaise;
    totalPaise += amount;
    items.push({ submissionId: s.id, amountPaise: amount });
  }
  if (totalPaise === 0) throw new Error('No payable amount');
  const payout = await prisma.payout.create({
    data: {
      creatorId,
      amountPaise: totalPaise,
      status: 'PENDING',
      referenceId: null,
    },
  });
  for (const item of items) {
    await prisma.payoutItem.create({
      data: { payoutId: payout.id, submissionId: item.submissionId, amountPaise: item.amountPaise },
    });
  }
  return prisma.payout.findUniqueOrThrow({
    where: { id: payout.id },
    include: { items: true },
  });
}

export async function markPayoutPaid(payoutId: string, adminId: string, referenceId: string) {
  return prisma.$transaction(async (tx) => {
    const payout = await tx.payout.findUnique({
      where: { id: payoutId },
      include: { items: { include: { submission: { include: { campaign: true } } } } },
    });
    if (!payout) throw new Error('Payout not found');
    if (payout.status === 'PAID') throw new Error('Payout already marked paid');
    for (const item of payout.items) {
      const campaign = item.submission.campaign;
      await tx.campaign.update({
        where: { id: campaign.id },
        data: {
          budgetReservedPaise: Math.max(0, campaign.budgetReservedPaise - item.amountPaise),
          budgetSpentPaise: campaign.budgetSpentPaise + item.amountPaise,
        },
      });
      await tx.ledgerEntry.create({
        data: {
          type: 'PAYOUT_PAID',
          campaignId: campaign.id,
          submissionId: item.submissionId,
          payoutId,
          amountPaise: item.amountPaise,
          createdById: adminId,
        },
      });
      const viewsPaid = Math.floor(
        (item.amountPaise / item.submission.campaign.ratePer1kViewsPaise) * 1000
      );
      await tx.submission.update({
        where: { id: item.submissionId },
        data: {
          payoutStatus: 'PAID',
          paidViewsTotal: item.submission.paidViewsTotal + viewsPaid,
        },
      });
    }
    await tx.payout.update({
      where: { id: payoutId },
      data: { status: 'PAID', referenceId },
    });
    await tx.auditLog.create({
      data: {
        actorId: adminId,
        actionType: 'PAYOUT_MARK_PAID',
        targetType: 'Payout',
        targetId: payoutId,
        metadata: { referenceId, amountPaise: payout.amountPaise },
      },
    });
    return tx.payout.findUniqueOrThrow({ where: { id: payoutId }, include: { items: true } });
  });
}
