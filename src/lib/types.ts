export type UserRole = 'creator' | 'host' | 'admin';

export interface ApiResponse<T> {
  data: T;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  roleType?: 'ADMIN' | 'USER';
  modeType?: 'CREATOR' | 'HOST' | 'POLYCODE';
  lastRoleUsed?: 'CREATOR' | 'HOST';
  roleMode: {
    creatorEnabled: boolean;
    hostEnabled: boolean;
  };
  hostProfile?: {
    companyName?: string;
    website?: string;
    verifiedBadge: boolean;
  };
  creatorHandles?: Record<string, string>;
  onboardingComplete: boolean;
  adminEnabled?: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  videoUrl?: string;
  campaignType?: string;
  productType?: string;
  productLink?: string;
  reviewContent?: boolean;
  platforms: string[];
  platformRates?: Record<string, number>;
  ratePer1kViewsPaise: number;
  tags?: string[];
  requirements?: string[];
  startAt: string;
  endAt: string;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'ENDED';
  budgetTotalPaise: number;
  budgetReservedPaise: number;
  budgetSpentPaise: number;
  createdAt?: string;
  host?: {
    name: string;
    email: string;
    verifiedBadge: boolean;
  };
  creatorCount?: number;
}

export interface CampaignSubmission {
  id: string;
  campaignId: string;
  creatorId: string;
  platform: string;
  handle: string;
  reelUrl?: string;
  status: 'PENDING_HOST_APPROVAL' | 'ACTIVE' | 'SUSPENDED' | 'ENDED';
  eligibleUntil: string;
  paidViewsTotal: number;
  lastVerifiedViewsTotal: number;
  lastVerifiedCycleIndex: number;
}

export interface EarningsSummary {
  availablePaise: number;
  pendingPaise: number;
  totalPaidPaise: number;
}

export interface CampaignCycleInfo {
  cycleIndex: number;
  nextWindowAt: string;
}

export interface RazorpayOrder {
  id: string;
  amountPaise: number;
  currency: string;
  receipt: string;
}
