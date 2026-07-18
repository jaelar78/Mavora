import { handle } from "@hono/node-server/vercel";
import app from "../api/app";

export default handle(app);
