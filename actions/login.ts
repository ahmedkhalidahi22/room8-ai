"use server";

import { signIn } from "@/auth";
import { LoginFormSchema } from "@/lib/validations";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginFormSchema>) => {
  const parsedUserInfo = LoginFormSchema.safeParse(values);

  if (!parsedUserInfo.success) {
    return {};
  }

  const { email, password } = parsedUserInfo.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "invalid credentials",
          };
        default:
          return {
            message: "invalid credentials",
          };
      }
    }

    throw error;
  }
};
