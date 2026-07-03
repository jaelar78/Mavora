# Mavora

Mavora is a deploy-ready React + Vite application with:

- Modern landing page
- Login and signup with Supabase Auth
- Dashboard, AI assistant, profile, and settings pages
- Responsive dark UI with app navigation
- Supabase database integration for metrics, profile, settings, and chat history

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
- `profiles` (`full_name`, `role`, `bio`, `updated_at`)
- `user_settings` (`timezone`, `email_notifications`, `weekly_digest`, `updated_at`)

Enable row-level security and policies so users can only access their own records.
