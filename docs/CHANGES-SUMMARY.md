# Summary of Changes — Promora MVP Backend & Wiring

This document summarizes all changes made to implement the full backend logic and connect it to the existing frontend.

---

## 1. New Backend (Next.js in `server/`)

A full Next.js 14 App Router API was added under **`server/`**. The frontend (Vite) proxies `/api` to this server.

### 1.1 Project setup
- **`server/package.json`** — Next.js, Prisma, NextAuth, Zod, bcryptjs, tsx for seed
- **`server/tsconfig.json`** — TypeScript for Next.js
- **`server/next.config.js`** — CORS headers for frontend origin
- **`server/middleware.ts`** — Adds CORS and handles OPTIONS for `/api/*`
- **`server/app/layout.tsx`** — Minimal root layout

### 1.2 Database (Prisma + Supabase Postgres)
- **`server/prisma/schema.prisma`** — Models:
  - **NextAuth:** `Account`, `Session`, `VerificationToken`, `User` (with `passwordHash`)
  - **Profile** — `creatorEnabled`, `hostEnabled`, `adminEnabled`, onboarding, host fields (`companyName`, `website`, `verifiedBadge`), creator fields
  - **Campaign** — hostId, title, description, platforms, ratePer1kViewsPaise, budgets (total/reserved/spent in paise), status (DRAFT/ACTIVE/PAUSED/ENDED), cycleHours, submissionEligibilityDays
  - **Participation** — campaignId, creatorId, platforms, handles (JSON), eligibleUntil
  - **Submission** — campaignId, creatorId, platform, handle, reelUrl, status, paidViewsTotal, lastVerifiedViewsTotal, lastVerifiedCycleIndex, payoutStatus
  - **VerificationRequest** — submissionId, cycleIndex, status (PENDING/VERIFIED/REJECTED)
  - **VerificationCheck** — submissionId, cycleIndex, verifiedViewsTotal, adminId, proofNote, proofUrl
  - **LedgerEntry** — type (DEPOSIT/RESERVE/RELEASE_RESERVE/PAYOUT_PAID/FEE), campaignId, submissionId, payoutId, amountPaise, idempotencyKey
  - **Payout** / **PayoutItem** — creatorId, amountPaise, status, referenceId
  - **AuditLog** — actorId, actionType, targetType, targetId, metadata

- **`server/.env.example`** — DATABASE_URL, NEXTAUTH_*, optional Google/Razorpay, SIMULATE_RAZORPAY, FRONTEND_ORIGIN, seed user env vars

### 1.3 Auth
- **`server/auth.ts`** — NextAuth config: Credentials provider (email + password via bcrypt), optional Google; JWT session; callbacks for `token.id` / `session.user.id`
- **`server/lib/auth.ts`** — `getSession`, `getCurrentUserId`, `requireAuth`, `ApiError`, `jsonResponse`, `errorResponse`
- **`server/lib/db.ts`** — Prisma client singleton

### 1.4 Validators
- **`server/validators/campaign.ts`** — Zod schemas:
  - `createCampaignSchema` — title, description, platforms (normalized to YOUTUBE/INSTAGRAM/FACEBOOK), ratePer1kViewsPaise, budgetTotalPaise (min 0)
  - `joinCampaignSchema` — platforms, handles
  - `submitContentSchema` — platform, reelUrl
  - `adminVerifySchema` — approved, verifiedViewsTotal, proofNote, proofUrl

### 1.5 Services (business logic, server-only)
- **`server/services/ledger.ts`** — `createLedgerEntry(type, campaignId, submissionId, payoutId, amountPaise, idempotencyKey)`
- **`server/services/campaign.ts`** — `createCampaign`, `depositCampaignBudget` (transactional, idempotent by key), `campaignAvailableBudget`, `activateCampaign`, `pauseCampaign`, `resumeCampaign`
- **`server/services/submission.ts`** — `joinCampaign` (participation upsert), `submitContent` (duplicate URL check, participation required), `createReverifyRequest` (cycle + eligibility checks)
- **`server/services/verification.ts`** — `adminVerifySubmission`: on approve — delta views, reserve amount, ledger RESERVE, VerificationCheck, AuditLog; on reject — status update + AuditLog
- **`server/services/payout.ts`** — `createPayoutForCreator` (unpaid approved submissions), `markPayoutPaid` (reserved → spent, ledger PAYOUT_PAID, submission paidViewsTotal, AuditLog)

### 1.6 API routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth (login, session, signout) |
| `/api/auth/signup` | POST | Register user + profile (email, password, role) |
| `/api/me` | GET, PATCH | Current user profile; update name/avatar/host fields |
| `/api/me/onboarding/creator` | POST | Save creator onboarding (platforms, contentTypes) |
| `/api/me/onboarding/host` | POST | Save host onboarding (companyName, website, businessType) |
| `/api/me/submissions` | GET | Current user’s submissions (creator) |
| `/api/me/earnings` | GET | Earnings summary (pendingPaise, totalPaidPaise) |
| `/api/campaigns` | GET, POST | List (optional status, hostId=me); create draft |
| `/api/campaigns/[id]` | GET, PATCH | Campaign detail; update (host only) |
| `/api/campaigns/[id]/activate` | POST | Activate draft (host, budget > 0) |
| `/api/campaigns/[id]/pause` | POST | Pause active campaign (host) |
| `/api/campaigns/[id]/resume` | POST | Resume paused campaign (host) |
| `/api/campaigns/[id]/join` | POST | Creator join (platforms, handles) |
| `/api/campaigns/[id]/submissions` | POST | Creator submit reel (platform, reelUrl) |
| `/api/campaigns/[id]/cycle` | GET | Current cycle index + next window time |
| `/api/submissions/[id]/reverify` | POST | Creator request re-verification for cycle |
| `/api/payments/razorpay/create-order` | POST | Create order (simulate credit if SIMULATE_RAZORPAY=true) |
| `/api/webhooks/razorpay` | POST | Razorpay webhook (signature check, idempotent credit) |
| `/api/admin/submissions` | GET | List submissions by status (admin) |
| `/api/admin/submissions/[id]/verify` | POST | Approve/reject + verifiedViewsTotal (admin) |
| `/api/admin/payouts` | POST | Create payout for creator (admin) |
| `/api/admin/payouts/[id]/mark-paid` | POST | Mark payout PAID + referenceId (admin) |
| `/api/admin/hosts/[id]/verify` | POST | Set host verified badge (admin) |

### 1.7 Seed
- **`server/prisma/seed.ts`** — Creates admin (ADMIN_EMAIL), sample host, sample creator; uses env for passwords and emails.

---

## 2. Frontend changes

### 2.1 API client & auth
- **`src/lib/apiClient.ts`** — Added `credentials: 'include'` so session cookies are sent.
- **`src/lib/api.ts`** — Added:
  - `signup`
  - `submitCreatorOnboarding`
  - `submitHostOnboarding`
- **`src/lib/auth.ts`** (new) — `login(email, password)` (CSRF + POST to NextAuth credentials), `logout()` (POST signout).
- **`src/lib/types.ts`** — `UserProfile` extended with `adminEnabled?`.

### 2.2 Dev proxy
- **`vite.config.ts`** — `server.proxy`: `/api` → `http://localhost:3000` so the UI hits the backend without setting `VITE_API_BASE_URL`.

### 2.3 App state and auth flow
- **`src/app/App.tsx`**:
  - **Session:** On load, `fetchUser()` calls `GET /api/me`; maps response to local `User` (including `currentRole`).
  - **Login:** `handleLogin(email, password)` → `auth.login` → `fetchUser()` → set user and go to dashboard or `redirectAfterAuth`.
  - **Signup:** `handleSignup(email, password, role)` → `api.signup` → `auth.login` → `fetchUser()` → redirect to onboarding or dashboard.
  - **Logout:** `handleLogout()` → `auth.logout()` → clear user.
  - **Role:** `currentRole` state (creator/host) and `handleRoleToggle`; sidebar and pages use `currentRole`.
  - **Loading:** `authChecked` state and loading UI until first `/api/me` completes.
  - **Onboarding:** Creator/Host onboarding completion triggers refetch and navigation.

### 2.4 Pages
- **`src/app/pages/login.tsx`** — `onLogin(email, password)` (two arguments); form submits both.
- **`src/app/pages/signup.tsx`** — `onSignup(email, password, role)` (password added); form submits all three.
- **`src/app/pages/creator-onboarding.tsx`** — Calls `api.submitCreatorOnboarding({ platforms, contentTypes })` on finish, then `onComplete()`; optional `onToast`.
- **`src/app/pages/host-onboarding.tsx`** — Calls `api.submitHostOnboarding({ companyName, website, businessType })` on finish, then `onComplete()`; optional `onToast`.

Existing pages (campaign-create, campaign-detail, campaign-manage, creator-dashboard, host-dashboard, campaign-discover, etc.) were **not** rewritten; they already used `api.*` where needed. They now get live data when the backend is running and the user is logged in.

---

## 3. Docs and run instructions

- **`README.md`** — Rewritten with:
  - How to run backend (install, .env, prisma generate, db push, seed, dev).
  - How to run frontend (install, dev).
  - One-time setup (env vars, seed).
  - Quick test logins (admin, host, creator).
- **`docs/action-map.md`** — Already present; maps UI actions to API routes.
- **`docs/manual-test-checklist.md`** — Already present; host → creator → admin verify → payout flow.

---

## 4. Behaviour highlights

- **Money in paise:** All amounts are integers (paise); no floats.
- **Budget:** `available = total - reserved - spent`; reserve on admin approve; move reserved → spent on mark payout paid.
- **Campaign activation:** Only DRAFT with budget > 0 and required fields can be activated; only ACTIVE campaigns accept submissions.
- **Verification:** Admin approve sets `verifiedViewsTotal`; earning = floor(deltaViews/1000) × ratePer1kViewsPaise; reserve is atomic in a transaction.
- **Payout:** Create payout from unpaid approved submissions; mark paid updates campaign budgets, submission `paidViewsTotal`/payoutStatus, ledger, audit log.
- **RBAC:** Host-only campaign mutations; creator-only own submissions; admin-only verify/payouts/host badge.
- **Abuse:** Duplicate reel URL per campaign rejected; platform/handle validation via Zod.

---

## 5. Files touched (quick reference)

**New under `server/`:**  
auth.ts, lib/db.ts, lib/auth.ts, middleware.ts, next.config.js, package.json, tsconfig.json, app/layout.tsx, .env.example, prisma/schema.prisma, prisma/seed.ts, validators/campaign.ts, services/ledger.ts, campaign.ts, submission.ts, verification.ts, payout.ts, and all route files under `app/api/`.

**Modified in repo root / src:**  
README.md, vite.config.ts, src/lib/apiClient.ts, src/lib/api.ts, src/lib/types.ts, src/app/App.tsx, src/app/pages/login.tsx, src/app/pages/signup.tsx, src/app/pages/creator-onboarding.tsx, src/app/pages/host-onboarding.tsx.

**New in src:**  
src/lib/auth.ts.

**Docs:**  
README.md (run instructions), docs/CHANGES-SUMMARY.md (this file).
