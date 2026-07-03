# Mavora

Mavora is an AI-powered operations workspace for turning ideas into organised action.

## What the app includes

- Branded Mavora homepage with product-focused messaging
- Supabase authentication routes (`/login` and `/signup`)
- Workspace routes for dashboard, assistant, ideas, tasks, and settings
- Responsive dark premium interface with blue/purple/teal gradient styling
- Supabase-backed sync for dashboard metrics, AI messages, and settings

## Routes

- `/`
- `/login`
- `/signup`
- `/dashboard`
- `/assistant`
- `/ideas`
- `/tasks`
- `/settings`

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

Create these tables with `user_id` columns tied to `auth.users.id`:

- `dashboard_metrics` (`label`, `value`, `delta`)
- `assistant_messages` (`role`, `content`, `created_at`)
- `ideas` (`title`, `stage`, `created_at`)
- `tasks` (`title`, `state`, `created_at`)
- `user_settings` (`timezone`, `email_notifications`, `weekly_digest`, `updated_at`)

Enable row-level security and policies so users can only access their own records.
