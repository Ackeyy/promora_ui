import { apiFetch } from '@/lib/apiClient';
import type {
  ApiResponse,
  Campaign,
  CampaignCycleInfo,
  CampaignSubmission,
  EarningsSummary,
  RazorpayOrder,
  UserProfile,
} from '@/lib/types';

export const api = {
  getMe: () => apiFetch<ApiResponse<UserProfile>>('/api/me'),
  updateMe: (payload: { name?: string; avatarUrl?: string; companyName?: string; website?: string; lastRoleUsed?: 'CREATOR' | 'HOST' }) =>
    apiFetch<ApiResponse<UserProfile>>('/api/me', { method: 'PATCH', body: payload }),
  submitCreatorOnboarding: (payload: { platforms: string[]; contentTypes?: string[] }) =>
    apiFetch<ApiResponse<{ ok: boolean }>>('/api/me/onboarding/creator', { method: 'POST', body: payload }),
  submitHostOnboarding: (payload: { companyName: string; website?: string; businessType?: string }) =>
    apiFetch<ApiResponse<{ ok: boolean }>>('/api/me/onboarding/host', { method: 'POST', body: payload }),
  signup: (payload: { email: string; password: string; name?: string; role: 'creator' | 'host' }) =>
    apiFetch<ApiResponse<{ id: string; email: string; name: string | null }>>('/api/auth/signup', {
      method: 'POST',
      body: payload,
    }),
  getCampaigns: (status?: string) =>
    apiFetch<ApiResponse<Campaign[]>>(`/api/campaigns${status ? `?status=${status}` : ''}`),
  getCampaign: (id: string) => apiFetch<ApiResponse<Campaign>>(`/api/campaigns/${id}`),
  createCampaign: (payload: {
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
    tags?: string[];
    requirements?: string[];
    ratePer1kViewsPaise: number;
    budgetTotalPaise: number;
    startAt?: string;
    endAt?: string;
  }) => apiFetch<ApiResponse<Campaign>>('/api/campaigns', { method: 'POST', body: payload }),
  activateCampaign: (id: string) => apiFetch<ApiResponse<Campaign>>(`/api/campaigns/${id}/activate`, { method: 'POST' }),
  pauseCampaign: (id: string) => apiFetch<ApiResponse<Campaign>>(`/api/campaigns/${id}/pause`, { method: 'POST' }),
  joinCampaign: (
    id: string,
    payload: { platforms: string[]; handles: Record<string, string> }
  ) => apiFetch<ApiResponse<CampaignSubmission>>(`/api/campaigns/${id}/join`, { method: 'POST', body: payload }),
  submitContent: (
    id: string,
    payload: { platform: string; reelUrl: string }
  ) => apiFetch<ApiResponse<CampaignSubmission>>(`/api/campaigns/${id}/submissions`, { method: 'POST', body: payload }),
  getMySubmissions: () => apiFetch<ApiResponse<CampaignSubmission[]>>('/api/me/submissions'),
  getMyEarnings: () => apiFetch<ApiResponse<EarningsSummary>>('/api/me/earnings'),
  reverifySubmission: (id: string) =>
    apiFetch<ApiResponse<{ id: string }>>(`/api/submissions/${id}/reverify`, { method: 'POST' }),
  getCampaignCycle: (id: string) =>
    apiFetch<ApiResponse<CampaignCycleInfo>>(`/api/campaigns/${id}/cycle`),
  createRazorpayOrder: (payload: { campaignId: string; amountPaise: number }) =>
    apiFetch<ApiResponse<RazorpayOrder>>('/api/payments/razorpay/create-order', { method: 'POST', body: payload }),
};
