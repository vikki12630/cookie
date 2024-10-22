import type { Context } from "hono";
import { verify } from "hono/jwt";
import type { JWTPayload } from "hono/utils/jwt/types";

export interface ICustomEnv {
  Variables: {
    user?: JWTPayload
  };
}

const bearerAuth = async (
  c: Context<ICustomEnv>,
  next: () => Promise<void>
) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.text("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    c.set("user",decoded);
    await next();
  } catch (error) {
    return c.text("invalid AccessToken ", 403);
  }
};

export default bearerAuth;
