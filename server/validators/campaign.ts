import { z } from 'zod';

const PLATFORMS = ['YOUTUBE', 'INSTAGRAM', 'FACEBOOK'] as const;
const platformEnum = z.enum(PLATFORMS);
const platformString = z.string().transform((s) => s.toUpperCase().replace(/^YT$/i, 'YOUTUBE').replace(/^IG$/i, 'INSTAGRAM').replace(/^FB$/i, 'FACEBOOK'));

export const createCampaignSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  thumbnail: z.string().url().optional().or(z.literal('')),
  videoUrl: z.string().url().optional().or(z.literal('')),
  campaignType: z.string().max(50).optional(),
  productType: z.string().max(200).optional(),
  productLink: z.string().max(2000).optional(),
  reviewContent: z.boolean().optional(),
  platformRates: z.record(z.number().int().min(0)).optional(),
  tags: z.array(z.string().min(1).max(50)).optional(),
  requirements: z.array(z.string().min(1).max(200)).optional(),
  platforms: z.array(z.string()).min(1).transform((arr) => arr.map((p) => {
    const u = String(p).toUpperCase();
    if (u === 'YT') return 'YOUTUBE';
    if (u === 'IG') return 'INSTAGRAM';
    if (u === 'FB') return 'FACEBOOK';
    return u as (typeof PLATFORMS)[number];
  })),
  ratePer1kViewsPaise: z.number().int().min(3000).max(100000), // ₹30–1000 per 1k
  budgetTotalPaise: z.number().int().min(0), // min ₹500 enforced on activate
  startAt: z.string().datetime().optional(),
  endAt: z.string().datetime().optional(),
});

export const joinCampaignSchema = z.object({
  platforms: z.array(z.union([platformEnum, z.string()])).min(1).transform((arr) => arr.map((p) => String(p).toUpperCase().replace(/^YT$/i, 'YOUTUBE').replace(/^IG$/i, 'INSTAGRAM').replace(/^FB$/i, 'FACEBOOK'))),
  handles: z.record(z.string().min(1).max(100)),
});

export const submitContentSchema = z.object({
  platform: z.union([platformEnum, z.string()]).transform((p) => String(p).toUpperCase().replace(/^YT$/i, 'YOUTUBE').replace(/^IG$/i, 'INSTAGRAM').replace(/^FB$/i, 'FACEBOOK')),
  reelUrl: z.string().url().max(2000),
});

export const adminVerifySchema = z.object({
  approved: z.boolean(),
  verifiedViewsTotal: z.number().int().min(0).optional(),
  proofNote: z.string().max(500).optional(),
  proofUrl: z.string().url().max(2000).optional(),
});

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;
export type JoinCampaignInput = z.infer<typeof joinCampaignSchema>;
export type SubmitContentInput = z.infer<typeof submitContentSchema>;
export type AdminVerifyInput = z.infer<typeof adminVerifySchema>;
