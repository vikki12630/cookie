import { signUpSchema } from "../schemas/signUpSchema";
import UserModel from "../models/userModel";
import { statusCodes } from "../utils/statusCodes";
import { sign, verify } from "hono/jwt";
import { setCookie, deleteCookie, getCookie } from "hono/cookie";
import { loginSchema } from "../schemas/loginSchema";
import type { CookieOptions } from "hono/utils/cookie";
import type { Context } from "hono";
import type { ICustomEnv } from "../middlewares/authMiddleware";

/*
@user signup
@Post request
@params = userName, email, name, password
*/
const signUp = async (c: Context) => {
  try {
    const info = await c.req.json();
    const data = signUpSchema.parse(info);
    const email = data.email;
    const username = data.username;

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return c.json(
        { message: "user already exist with this username or email" },
        statusCodes.USER_ALREADY_EXIST
      );
    }

    const hashedPassword = await Bun.password.hash(data.password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    const user = await UserModel.create({
      name: data.name,
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });

    if (!user) {
      return c.json(
        { message: "Unable to create user db_errors" },
        statusCodes.DB_ERRORS
      );
    }

    const userData = await UserModel.findById(user._id).select("-password");

    if (!userData) {
      return c.json(
        { message: "Unable to find user" },
        statusCodes.USER_NOT_FOUND
      );
    }

    const accessToken = await sign(
      {
        id: userData._id,
        exp: Math.floor(Date.now() / 1000) + 60 * 15,
      },
      process.env.ACCESS_TOKEN_SECRET as string
    );

    const refreshToken = await sign(
      {
        id: userData._id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      },
      process.env.REFRESH_TOKEN_SECRET as string
    );

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    setCookie(c, "refreshToken", refreshToken, cookieOptions);

    return c.json(
      { message: "user created successfully", userData, accessToken },
      statusCodes.USER_CREATED
    );
  } catch (error) {
    return c.json({ error: error });
  }
};

/*
@user login
@Post request
@params = userName or email, password
*/
const login = async (c: Context) => {
  try {
    const info = await c.req.json();
    const data = loginSchema.parse(info);
    const email = data.identifier;
    const username = data.identifier;

    const user = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return c.json(
        { message: "invalid email or username" },
        statusCodes.USER_NOT_FOUND
      );
    }

    const decryptPassword = await Bun.password.verify(
      data.password,
      user.password
    );
    console.log(decryptPassword);
    if (!decryptPassword) {
      return c.json({ message: "invalid password" }, statusCodes.INVALID);
    }

    const userData = await UserModel.findById(user._id).select("-password");

    if (!userData) {
      return c.json(
        { message: "Unable to find user" },
        statusCodes.USER_NOT_FOUND
      );
    }

    const accessToken = await sign(
      {
        id: userData._id,
        exp: Math.floor(Date.now() / 1000) + 60 * 15,
      },
      process.env.ACCESS_TOKEN_SECRET as string
    );

    const refreshToken = await sign(
      {
        id: userData._id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      },
      process.env.REFRESH_TOKEN_SECRET as string
    );

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    setCookie(c, "refreshToken", refreshToken, cookieOptions);
    return c.json(
      { message: "user logged-in successfully", userData, accessToken },
      statusCodes.USER_LOGGEDIN
    );
  } catch (error) {
    return c.json({ error: error });
  }
};

/*
@refreshing the access token
@get request
@params = cookies
*/

const refreshAccessToken = async (c: Context) => {
  try {
    const cookies = getCookie(c, "refreshToken");
    if (!cookies) {
      return c.json(
        {
          message: "refresh token not found",
        },
        statusCodes.NOT_FOUND
      );
    }

    const decoded = await verify(
      cookies,
      process.env.REFRESH_TOKEN_SECRET as string
    );

    const userData = await UserModel.findById(decoded.id);

    if (!userData) {
      return c.json({ message: "user not found" }, statusCodes.NOT_FOUND);
    }
    const accessToken = await sign(
      {
        id: userData._id,
        exp: Math.floor(Date.now() / 1000) + 60 * 15,
      },
      process.env.ACCESS_TOKEN_SECRET as string
    );

    return c.json(
      { message: "new access token", accessToken },
      statusCodes.SUCCESS
    );
  } catch (error) {
    return c.json({ error: error });
  }
};

/*
@user logout
@Post request
@params = userId
*/
const logout = async (c: Context<ICustomEnv>) => {
  try {
    const userId = c.get("user");
    if (userId === undefined) {
      return c.json({ message: "Invalid user data" }, 400);
    }
    const user = await UserModel.findById(userId.id);
    if (!user) {
      return c.json({ message: "user not found" }, statusCodes.NOT_FOUND);
    }
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: -1,
    };
    deleteCookie(c, "refreshToken", cookieOptions);
    return c.json({ message: "user logged out" });
  } catch (error) {
    return c.json({ error: error });
  }
};

/*
@get current user
@Get request
@params = userId
*/
const getCurrentUser = async (c: Context<ICustomEnv>) => {
  try {
    const userId = c.get("user");
    if (userId === undefined) {
      return c.json({ message: "Invalid user data" }, 400);
    }

    const userData = await UserModel.findById(userId.id).select("-password");
    if (!userData) {
      return c.json({ message: "user not found" }, statusCodes.NOT_FOUND);
    }

    return c.json({ message: "user fetched", userData }, statusCodes.SUCCESS);
  } catch (error) {
    return c.json({ error: error });
  }
};
export { signUp, login, refreshAccessToken, logout, getCurrentUser };
