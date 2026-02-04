import { prisma } from '@/lib/db';
import { createLedgerEntry } from './ledger';
import { campaignAvailableBudget } from './campaign';
import type { AdminVerifyInput } from '@/validators/campaign';

export async function adminVerifySubmission(
  submissionId: string,
  adminId: string,
  input: AdminVerifyInput
) {
  return prisma.$transaction(async (tx) => {
    const submission = await tx.submission.findUnique({
      where: { id: submissionId },
      include: { campaign: true },
    });
    if (!submission) throw new Error('Submission not found');
    if (submission.status !== 'PENDING_HOST_APPROVAL' && submission.status !== 'ACTIVE') {
      throw new Error('Submission not in verifiable state');
    }
    const cycleIndex = submission.campaign.startAt
      ? Math.floor(
          (Date.now() - submission.campaign.startAt.getTime()) /
            (submission.campaign.cycleHours * 3600 * 1000)
        )
      : 0;

    if (input.approved) {
      const verifiedViewsTotal = input.verifiedViewsTotal ?? submission.lastVerifiedViewsTotal;
      if (verifiedViewsTotal < submission.paidViewsTotal) {
        throw new Error('Verified views cannot be lower than already paid views');
      }
      const deltaViews = verifiedViewsTotal - submission.paidViewsTotal;
      const units = Math.floor(deltaViews / 1000);
      const amountPaise = units * submission.campaign.ratePer1kViewsPaise;
      const campaign = await tx.campaign.findUniqueOrThrow({ where: { id: submission.campaignId } });
      const available = campaignAvailableBudget(campaign);
      if (amountPaise > 0 && available < amountPaise) {
        throw new Error('Insufficient campaign budget');
      }
      if (amountPaise > 0) {
        await tx.campaign.update({
          where: { id: submission.campaignId },
          data: { budgetReservedPaise: campaign.budgetReservedPaise + amountPaise },
        });
        await tx.ledgerEntry.create({
          data: {
            type: 'RESERVE',
            campaignId: submission.campaignId,
            submissionId,
            amountPaise,
            createdById: adminId,
          },
        });
      }
      await tx.verificationCheck.create({
        data: {
          submissionId,
          cycleIndex,
          verifiedViewsTotal,
          adminId,
          proofNote: input.proofNote,
          proofUrl: input.proofUrl,
        },
      });
      await tx.submission.update({
        where: { id: submissionId },
        data: {
          status: 'ACTIVE',
          lastVerifiedViewsTotal: verifiedViewsTotal,
          lastVerifiedCycleIndex: cycleIndex,
        },
      });
      await tx.auditLog.create({
        data: {
          actorId: adminId,
          actionType: 'VERIFY_APPROVE',
          targetType: 'Submission',
          targetId: submissionId,
          metadata: { verifiedViewsTotal, amountPaise, cycleIndex },
        },
      });
    } else {
      await tx.submission.update({
        where: { id: submissionId },
        data: { status: submission.status === 'PENDING_HOST_APPROVAL' ? 'SUSPENDED' : submission.status },
      });
      await tx.auditLog.create({
        data: {
          actorId: adminId,
          actionType: 'VERIFY_REJECT',
          targetType: 'Submission',
          targetId: submissionId,
          metadata: { proofNote: input.proofNote },
        },
      });
    }
    return tx.submission.findUniqueOrThrow({ where: { id: submissionId }, include: { campaign: true } });
  });
}
