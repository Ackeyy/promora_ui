import { prisma } from '@/lib/db';
import type { CreateCampaignInput } from '@/validators/campaign';
import { createLedgerEntry } from './ledger';

export async function createCampaign(hostId: string, input: CreateCampaignInput) {
  const campaign = await prisma.campaign.create({
    data: {
      hostId,
      title: input.title,
      description: input.description,
      thumbnail: input.thumbnail || undefined,
      videoUrl: input.videoUrl || undefined,
      campaignType: input.campaignType || undefined,
      productType: input.productType || undefined,
      productLink: input.productLink || undefined,
      reviewContent: input.reviewContent ?? false,
      platforms: input.platforms,
      platformRates: input.platformRates ?? undefined,
      ratePer1kViewsPaise: input.ratePer1kViewsPaise,
      tags: input.tags ?? [],
      requirements: input.requirements ?? [],
      budgetTotalPaise: input.budgetTotalPaise ?? 0,
      status: 'DRAFT',
      startAt: input.startAt ? new Date(input.startAt) : undefined,
      endAt: input.endAt ? new Date(input.endAt) : undefined,
    },
  });
  return campaign;
}

export async function depositCampaignBudget(
  campaignId: string,
  amountPaise: number,
  idempotencyKey: string,
  createdById?: string
) {
  return prisma.$transaction(async (tx) => {
    const campaign = await tx.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign) throw new Error('Campaign not found');
    if (campaign.status !== 'DRAFT' && campaign.status !== 'ACTIVE') {
      throw new Error('Campaign cannot receive funds');
    }
    if (idempotencyKey) {
      const existing = await tx.ledgerEntry.findUnique({ where: { idempotencyKey } });
      if (existing) return { campaign: await tx.campaign.findUniqueOrThrow({ where: { id: campaignId } }), existing: true };
    }
    const shouldSkipIncrement =
      campaign.status === 'DRAFT' &&
      campaign.budgetTotalPaise > 0 &&
      campaign.budgetTotalPaise === amountPaise;
    await tx.campaign.update({
      where: { id: campaignId },
      data: {
        budgetTotalPaise: shouldSkipIncrement
          ? campaign.budgetTotalPaise
          : campaign.budgetTotalPaise + amountPaise,
      },
    });
    await tx.ledgerEntry.create({
      data: {
        type: 'DEPOSIT',
        campaignId,
        amountPaise,
        idempotencyKey: idempotencyKey || undefined,
        createdById,
      },
    });
    return { campaign: await tx.campaign.findUniqueOrThrow({ where: { id: campaignId } }), existing: false };
  });
}

export function campaignAvailableBudget(c: { budgetTotalPaise: number; budgetReservedPaise: number; budgetSpentPaise: number }) {
  return c.budgetTotalPaise - c.budgetReservedPaise - c.budgetSpentPaise;
}

export async function activateCampaign(campaignId: string, hostId: string) {
  const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
  if (!campaign) throw new Error('Campaign not found');
  if (campaign.hostId !== hostId) throw new Error('Forbidden');
  if (campaign.status !== 'DRAFT') throw new Error('Only draft campaigns can be activated');
  if (campaign.budgetTotalPaise <= 0) throw new Error('Campaign must have budget to activate');
  if (!campaign.title || !campaign.description || campaign.platforms.length === 0) {
    throw new Error('Campaign must have title, description, and platforms');
  }
  const startAt = campaign.startAt ?? new Date();
  const endAt = campaign.endAt ?? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  return prisma.campaign.update({
    where: { id: campaignId },
    data: { status: 'ACTIVE', startAt, endAt },
  });
}

export async function pauseCampaign(campaignId: string, hostId: string) {
  const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
  if (!campaign) throw new Error('Campaign not found');
  if (campaign.hostId !== hostId) throw new Error('Forbidden');
  if (campaign.status !== 'ACTIVE') throw new Error('Only active campaigns can be paused');
  return prisma.campaign.update({
    where: { id: campaignId },
    data: { status: 'PAUSED' },
  });
}

export async function resumeCampaign(campaignId: string, hostId: string) {
  const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
  if (!campaign) throw new Error('Campaign not found');
  if (campaign.hostId !== hostId) throw new Error('Forbidden');
  if (campaign.status !== 'PAUSED') throw new Error('Only paused campaigns can be resumed');
  return prisma.campaign.update({
    where: { id: campaignId },
    data: { status: 'ACTIVE' },
  });
}
