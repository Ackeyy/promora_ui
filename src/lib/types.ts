export type UserRole = 'creator' | 'host' | 'admin';

export interface ApiResponse<T> {
  data: T;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  roleMode: {
    creatorEnabled: boolean;
    hostEnabled: boolean;
  };
  hostProfile?: {
    companyName?: string;
    website?: string;
    verifiedBadge: boolean;
  };
  onboardingComplete: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  platforms: string[];
  ratePer1kViewsPaise: number;
  startAt: string;
  endAt: string;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'ENDED';
  budgetTotalPaise: number;
  budgetReservedPaise: number;
  budgetSpentPaise: number;
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
