# ── Build stage ─────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# ── Runtime stage ───────────────────────────────────────────────
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Server bundle is fully self-contained (esbuild --bundle); only
# runtime assets it needs are the static files and the env config.
COPY --from=build /app/dist ./dist
COPY package.json ./
COPY .env ./

EXPOSE 3000
CMD ["node", "dist/boot.js"]
