# AGENTS.md

## Cursor Cloud specific instructions

Dovroyn is a **client-side React + Vite single-page app** (no backend server lives in this repo). The only real external service is **Supabase** (auth + Postgres); Stripe is referenced only via static payment-link URLs. Package manager is **npm** (`package-lock.json`).

Standard commands are the ones in `package.json` and `README.md`:
- `npm run dev` — start the Vite dev server (defaults to http://localhost:5173/).
- `npm run build` — production build (also the best "does it compile" check; there is **no lint or test script** in this repo).
- `npm run preview` — serve the built `dist/`.

Non-obvious notes:
- **The app degrades gracefully without Supabase.** `src/lib/supabaseClient.js` sets `supabaseConfigured = Boolean(VITE_SUPABASE_URL && VITE_SUPABASE_ANON_KEY)`. With no `.env`, the public landing page, the interactive **AI Assistant Preview** (canned responses, no network), and the **`/demo-pod`** dashboard (static demo data) all work fully. Auth, signup, waitlist persistence, and real pod creation are guarded off until Supabase is configured.
- **Do not copy `.env.example` verbatim.** Its placeholder values (`https://your-project.supabase.co`, `your-anon-key`) are non-empty, so they flip `supabaseConfigured` to `true` and cause auth/network calls to fail against a fake URL. Either leave `.env` absent (recommended for demoing public/demo flows) or fill in real `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.
- **Testing the full authenticated flow requires a real Supabase project**: apply `supabase-migration.sql` to it, set the two `VITE_` env vars, and (because there is no backend/webhook) manually insert a paid row into the `subscriptions` table to unlock pod creation (`src/pages/NewPod.jsx` / `src/pages/Pods.jsx` gate creation behind a non-`free` tier).
- No Docker / Supabase CLI is installed in this environment; a local Supabase stack is not set up. The AI assistant and all pod analysis content are hardcoded mock data — there is no LLM/AI service to run.
