# Promora UI Action Map (MVP v1)

This document maps UI actions to backend operations and required data structures. It is based on scanning the current UI pages and components under `src/app/pages` and shared UI elements.

## Global / Shared

- **App Sidebar** (`app-sidebar.tsx`)
  - Toggle Creator/Host mode → `POST /api/me/role` (or `PATCH /api/me` if combined) to update `roleMode` flags + active role in session.
  - Settings → `GET /api/me` for profile data; `PATCH /api/me` to update profile.
  - Logout → `POST /api/auth/logout` (or NextAuth signOut if in Next). Session invalidation.
  - Footer links (Terms/Privacy/Support) → static routes (no API).

- **Settings Modal** (`settings-modal.tsx`)
  - Save profile → `PATCH /api/me` (name, avatar, companyName, website).
  - Host verified badge is read-only → from `GET /api/me`.

## Auth & Onboarding

- **Landing** (`landing.tsx`)
  - CTA to Sign Up / Login → auth routes only (no API).

- **Login** (`login.tsx`)
  - Submit login form → `POST /api/auth/login` or NextAuth credentials provider.
  - On success → `GET /api/me`.

- **Signup** (`signup.tsx`)
  - Submit signup form → `POST /api/auth/signup` or NextAuth + email provider.
  - On success → `GET /api/me`.

- **Creator Onboarding** (`creator-onboarding.tsx`)
  - Step navigation & submit → `POST /api/me/onboarding/creator` to save platforms + content type.
  - Fields required: `creatorEnabled`, preferred platforms, content types.

- **Host Onboarding** (`host-onboarding.tsx`)
  - Step navigation & submit → `POST /api/me/onboarding/host` to save company details and verification request.
  - Fields required: `companyName`, `website`, `businessType`, `hostEnabled`.

## Campaign Discovery & Details

- **Campaign Discover** (`campaign-discover.tsx`)
  - Filters (platform/category/verified) → `GET /api/campaigns?status=ACTIVE&platform=...&category=...&verified=...`.
  - “Create Campaign” (host) → navigates to create page.
  - Campaign click → `GET /api/campaigns/:id`.

- **Campaign Detail** (`campaign-detail.tsx`)
  - Join Campaign (creator) → `POST /api/campaigns/:id/join` with `platforms`, `handles`.
  - Manage Campaign (host) → navigates to manage page.
  - Stats + progress → `GET /api/campaigns/:id` to populate view/budget data.

## Creator Experience

- **Creator Dashboard** (`creator-dashboard.tsx`)
  - Load joined campaigns → `GET /api/me/submissions` (with campaign details) or `GET /api/me/campaigns`.
  - Earnings summary → `GET /api/me/earnings`.
  - Upload content → `POST /api/campaigns/:id/submissions` with `platform`, `reelUrl`.
  - Re-verify → `POST /api/submissions/:id/reverify` (per cycle).
  - Campaign click → `GET /api/campaigns/:id`.

- **Creator Stats** (`creator-stats.tsx`)
  - Charts/summary → `GET /api/me/earnings` + `GET /api/me/submissions`.

## Host Experience

- **Host Dashboard** (`host-dashboard.tsx`)
  - Load host campaigns → `GET /api/campaigns?hostId=me`.
  - Platform-held funds → `GET /api/me/ledger` (credits + reserves + spend).
  - Manage campaign → `GET /api/campaigns/:id`.

- **Campaign Create** (`campaign-create.tsx`)
  - Save Draft → `POST /api/campaigns` (status DRAFT).
  - Start Campaign (deposit) →
    - `POST /api/campaigns` (DRAFT)
    - `POST /api/payments/razorpay/create-order` for `amountPaise`
    - `POST /api/campaigns/:id/activate` after payment webhook confirms.

- **Campaign Manage** (`campaign-manage.tsx`)
  - Toggle pause/resume → `POST /api/campaigns/:id/pause` / `POST /api/campaigns/:id/activate`.
  - Extend budget → `POST /api/payments/razorpay/create-order` + ledger updates.
  - Extend period → `PATCH /api/campaigns/:id` (end date).
  - Edit details → `PATCH /api/campaigns/:id` (title/description/platforms/rate).

- **Host Stats** (`host-stats.tsx`)
  - Analytics → `GET /api/campaigns?hostId=me` + `GET /api/campaigns/:id` aggregates.

## Admin (MVP)

- **Verification queue** → `GET /api/admin/submissions?status=PENDING`.
- **Verify/Reject submission** → `POST /api/admin/submissions/:id/verify`.
- **Create payout** → `POST /api/admin/payouts`.
- **Mark payout paid** → `POST /api/admin/payouts/:id/mark-paid`.
- **Verify host badge** → `POST /api/admin/hosts/:id/verify`.

## Required DB Tables / Fields (if missing)

- `User`/`Profile` (NextAuth userId, `roleMode.creatorEnabled`, `roleMode.hostEnabled`, `hostProfile.companyName`, `hostProfile.website`, `hostProfile.verifiedBadge`).
- `Campaign` (see spec: budgets, rate, platforms, schedule, status, cycleHours=48).
- `Submission` / `Participation` (campaignId, creatorId, platform, handle, reelUrl, status, eligibleUntil, paidViewsTotal, lastVerifiedViewsTotal, lastVerifiedCycleIndex).
- `VerificationRequest`, `VerificationCheck`.
- `LedgerEntry` (DEPOSIT, RESERVE, RELEASE_RESERVE, PAYOUT_PAID, FEE).
- `Payout`.
- `AuditLog`.

