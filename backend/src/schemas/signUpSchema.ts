import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "username must be atleast 3 characters" })
    .max(15, { message: "username must be less than 15 characters" })
    .regex(/^[a-zA-z0-9]+$/,{message: "special characters not allowed"}),

  email: z.string().email({ message: "invalid email" }),
  name: z.string().min(3, { message: "name must be atleast 3 characters" }),
  password: z
    .string()
    .min(6, { message: "password must be atleast 6 characters " }),
});
