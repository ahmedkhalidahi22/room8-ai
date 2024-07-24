import prisma from "@/lib/prisma";
import { LoginFormSchema } from "@/lib/validations";
import { NextResponse } from "next/server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export async function POST(request: Request, response: NextResponse) {
  const userInfo: unknown = await request.json();
  const parsedUserInfo = LoginFormSchema.safeParse(userInfo);

  console.log("function triggered successfully");

  if (!parsedUserInfo.success) {
    return NextResponse.json(parsedUserInfo.error, { status: 422 });
  }

  const { email, password } = parsedUserInfo.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json({
            message: "invalid credentials",
          });
        default:
          return NextResponse.json({
            message: "something went wrong",
          });
      }
    }

    throw error;
  }
}
