import { createRouter, publicQuery } from "./middleware";
import { chatRouter } from "./chatRouter";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
