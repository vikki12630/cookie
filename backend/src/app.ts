import { Hono } from "hono";
import { logger } from "hono/logger";
import userRoutes from "./routes/userRoutes";

const app = new Hono();

app.use("*", logger());

app.route("/api/user", userRoutes);

export default app;
