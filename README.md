# Dovroyn — AI Social Media Manager

Marketing landing site for Dovroyn (dovroyn.com) with a live AI chatbot preview powered by an LLM backend.

## Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Hono + tRPC 11 (type-safe API)
- **AI**: OpenAI-compatible chat completions (configured via env vars)
- **DB**: Drizzle ORM + MySQL (optional, scaffolded)

## Develop

```bash
npm install
npm run dev        # http://localhost:3000 (frontend + API with HMR)
```

## Build & run (self-hosted / Docker)

```bash
npm run build      # outputs dist/public (frontend) + dist/boot.js (server)
npm start          # NODE_ENV=production node dist/boot.js on :3000
```

A `Dockerfile` is included for containerized deployment.

## Deploy to Vercel

`vercel.json` configures two builds:
- `serverless/handler.ts` → serverless function serving `/api/*`
- static frontend from `dist/public`

Required environment variables (Vercel → Settings → Environment Variables):

| Key | Purpose |
| --- | --- |
| `APP_ID` | Application ID |
| `APP_SECRET` | JWT/session secret |
| `DATABASE_URL` | MySQL connection string |
| `DEFAULT_AI_API_KEY` | LLM API key (homepage chatbot) |
| `DEFAULT_AI_BASE_URL` | LLM base URL, e.g. `https://agent-gw.kimi.com/coding/v1` |
| `DEFAULT_AI_MODEL` | LLM model, e.g. `kimi:kimi-k2.5` |

## Project layout

```
api/            Hono + tRPC backend (chat.send = AI chatbot)
contracts/      Shared types between frontend and backend
serverless/     Vercel serverless entry
db/             Drizzle schema (MySQL)
src/
  sections/     Landing page sections (Hero, Pricing, FAQ, ...)
  components/   UI components (dovroyn/ = brand components, ui/ = shadcn)
```
