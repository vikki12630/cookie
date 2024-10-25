import { Hono } from "hono";
import {
  getCurrentUser,
  getUser,
  login,
  logout,
  refreshAccessToken,
  searchUser,
  signUp,
} from "../controllers/userController";
import bearerAuth from "../middlewares/authMiddleware";

const userRoutes = new Hono();

userRoutes.post("/login", login);
userRoutes.post("/signup", signUp);
userRoutes.get("/refreshaccesstoken", refreshAccessToken);

// protected routes
userRoutes.post("/logout", bearerAuth, logout);
userRoutes.get("/getcurrentuser", bearerAuth, getCurrentUser);
userRoutes.get("/searchuser", bearerAuth, searchUser);
userRoutes.get("/getuser", bearerAuth, getUser);

export default userRoutes;
