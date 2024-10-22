import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import userRoutes from "./routes/userRoutes";

const app = new Hono();

app.use("*", logger());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.route("/api/user", userRoutes);

export default app;
