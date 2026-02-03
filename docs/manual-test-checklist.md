# Promora Manual Test Checklist (MVP v1)

## Host Deposit → Campaign Active → Creator Submit → Admin Verify → Payout

1. **Host onboarding & login**
   - [ ] Log in as host (verified or pending).
   - [ ] Confirm profile data in settings (`/api/me`).

2. **Create campaign**
   - [ ] Create a new campaign draft (`POST /api/campaigns`).
   - [ ] Create Razorpay order (`POST /api/payments/razorpay/create-order`).
   - [ ] Complete payment → webhook (`POST /api/webhooks/razorpay`) credits ledger and activates campaign.
   - [ ] Confirm campaign is `ACTIVE` (`GET /api/campaigns/:id`).

3. **Creator joins campaign**
   - [ ] Log in as creator.
   - [ ] Join campaign (`POST /api/campaigns/:id/join`).
   - [ ] Submit reel URL (`POST /api/campaigns/:id/submissions`).

4. **Verification cycle**
   - [ ] Request re-verification (`POST /api/submissions/:id/reverify`).
   - [ ] Admin verifies submission (`POST /api/admin/submissions/:id/verify`).
   - [ ] Confirm ledger entries created (RESERVE, RELEASE_RESERVE, FEE, PAYOUT).

5. **Payout**
   - [ ] Admin creates payout (`POST /api/admin/payouts`).
   - [ ] Mark payout paid (`POST /api/admin/payouts/:id/mark-paid`).
   - [ ] Creator sees updated earnings (`GET /api/me/earnings`).

6. **Budget enforcement**
   - [ ] Attempt to verify views exceeding remaining budget; confirm payout is capped and campaign pauses.

7. **Idempotency & safety**
   - [ ] Replay Razorpay webhook; ensure ledger credits once (idempotency).
   - [ ] Ensure creators are never paid twice for same views.

