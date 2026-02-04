# Promora Web App

Performance-based promotion marketplace (India-focused). Campaign hosts launch campaigns; creators promote and earn per verified views.

## How to run the website

You need **two terminals**: one for the backend (API + auth), one for the frontend (UI). The frontend proxies `/api` to the backend.

### 1. Backend (Next.js API on port 3000)

```bash
cd server
npm install
cp .env.example .env
# Edit .env and set DATABASE_URL (Supabase Postgres) and NEXTAUTH_SECRET
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Leave this running. The API will be at **http://localhost:3000**.

### 2. Frontend (Vite + React on port 5173)

In a **new terminal** from the project root:

```bash
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser. The UI will call the backend via the proxy (no need to set `VITE_API_BASE_URL` in dev).

### One-time setup

- **`.env`** in `server/`: at minimum set `DATABASE_URL` and `NEXTAUTH_SECRET`. Use your Supabase connection string for `DATABASE_URL`.
- **Seed** (`npm run db:seed` in `server/`): creates admin (from `ADMIN_EMAIL`), sample host, and sample creator so you can log in.

### Quick test logins (after seed)

| Role    | Email              | Password      |
|---------|--------------------|---------------|
| Admin   | admin@promora.com | AdminPassword123! |
| Host    | host@promora.com   | Password123!  |
| Creator | amplifier@promora.com | Password123! |

---

Original UI design: https://www.figma.com/design/7qIIPKJHAtyYthmejyctMI/Promora-Web-App-UI.
