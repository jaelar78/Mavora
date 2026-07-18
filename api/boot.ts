import app from "./app";
import { env } from "./lib/env";

export default app;

// In production (but NOT on Vercel, where the app is served as a
// serverless function via serverless/handler.ts), start a Node server
// that also serves the built frontend.
if (env.isProduction && !process.env.VERCEL) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite");
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
