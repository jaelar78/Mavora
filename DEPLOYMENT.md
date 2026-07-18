# Dovroyn — Auto-Deployment Setup

## What This Does

Every time you push to GitHub, it automatically:
1. **Deploys your frontend** to Vercel
2. **Deploys Edge Functions** to Supabase

**No more manual clicks. No more Supabase dashboard. Just `git push` and it deploys.**

---

## Step 1: Add GitHub Secrets

Go to your GitHub repo → Settings → Secrets and variables → Actions → New repository secret

Add these secrets:

### Required for Supabase Deployment

| Secret Name | Where to Find It |
|---|---|
| `SUPABASE_ACCESS_TOKEN` | Supabase Dashboard → Account → Access Tokens → New token |
| `SUPABASE_PROJECT_REF` | Supabase Dashboard → Settings → General → Reference ID (looks like `abc123def456`) |

### Required for Vercel Deployment

| Secret Name | Where to Find It |
|---|---|
| `VERCEL_TOKEN` | Vercel Dashboard → Settings → Tokens → Create |
| `VERCEL_ORG_ID` | Vercel Dashboard → `~/.vercel/project.json` or Settings |
| `VERCEL_PROJECT_ID` | Vercel Dashboard → Project Settings → General → Project ID |

### Required for Build

| Secret Name | Where to Find It |
|---|---|
| `VITE_SUPABASE_URL` | Supabase Dashboard → Settings → API → URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon/public key |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API Keys → Publishable key |

---

## Step 2: Run Database Migration (One Time)

1. Go to Supabase Dashboard → SQL Editor → New query
2. Copy everything from `supabase-migration.sql`
3. Click Run

Done. Tables are created.

---

## Step 3: Add OpenAI Key to Edge Functions (One Time)

1. Supabase Dashboard → Edge Functions → Secrets
2. Add secret: `OPENAI_API_KEY` = your OpenAI API key

This is ONLY for the fallback features (chat, website analysis, calendar). The proprietary engine doesn't use it.

---

## Step 4: Push & Deploy

```bash
git add .
git commit -m "setup auto-deployment"
git push
```

Watch GitHub Actions tab — it will deploy everything automatically.

---

## What Gets Deployed

### On every push to `main`:
- ✅ Frontend → Vercel (auto-build + deploy)
- ✅ Edge Functions → Supabase (auto-deploy all functions)

### Files that trigger deployment:
- `src/**` → Frontend rebuild
- `supabase/functions/**` → Edge Functions redeploy
- `supabase-migration.sql` → Manual (run in SQL Editor)

---

## Troubleshooting

**"Supabase access token invalid"**
- Regenerate token in Supabase Account settings

**"Vercel deployment failed"**
- Check `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` match your project

**"Edge function not found"**
- Make sure function folder exists in `supabase/functions/{name}/index.ts`

---

## Status

Once set up, your workflow is:

1. Edit code locally
2. `git commit` + `git push`
3. GitHub Actions deploys everything automatically
4. Site live at your Vercel URL

**No manual deploys. No dashboard clicking. Just push.** 💀
