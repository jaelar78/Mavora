# Dovroyn

Dovroyn is a deploy-ready React + Vite application for AI ad-intelligence pods, with:

- Dedicated pod-first landing and navigation experience
- Login and signup with Supabase Auth
- Pod dashboards, website analysis, campaigns, competitor watch, content planner, and pricing pages
- Early access modal on the landing page that captures waitlist signups in Supabase
- Responsive premium dark luxury UI
- Supabase-backed settings persistence and placeholder states for upcoming integrations

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
3. Add your Supabase values to `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Run locally:
   ```bash
   npm run dev
   ```

## Build

```bash
npm run build
```

## Supabase tables

Create this table with a `user_id` column tied to `auth.users.id`:

- `user_settings` (`timezone`, `email_notifications`, `weekly_digest`, `workspace_name`, `theme`, `updated_at`)

Enable row-level security and policies so users can only access their own rows.

Also create this table for early access signups collected by the landing page modal:

- `waitlist` (`email`, `source`)

Enable row-level security with a policy that allows anonymous inserts, since visitors join the waitlist before signing up.
