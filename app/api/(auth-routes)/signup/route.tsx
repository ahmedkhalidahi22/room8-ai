import prisma from "@/lib/prisma";
import { signupFormSchema } from "@/lib/validations";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getUserByEmail } from "@/data/user";

export async function POST(request: Request, response: NextResponse) {
  // const userInfo: unknown = await request.json();
  // const parsedUserInfo = signupFormSchema.safeParse(userInfo);
  // if (!parsedUserInfo.success) {
  //   return NextResponse.json(parsedUserInfo.error, { status: 422 });
  // }
  // const email = parsedUserInfo.data.email;
  // const existingUser = await getUserByEmail(email);
  // if (existingUser) {
  //   return NextResponse.json({ message: "Error: email already in use" });
  // }
  // const hashedPassword = await bcrypt.hash(parsedUserInfo.data.password, 10);
  // // const user = await prisma.user.create({
  // //   data: {
  // //     email: parsedUserInfo.data.email,
  // //     name: parsedUserInfo.data.name,
  // //     password: hashedPassword,
  // //     phone: parsedUserInfo.data.phone ?? null,
  // //   },
  // // });
  // return NextResponse.json({
  //   message: "user signed up successfully",
  // });
}
