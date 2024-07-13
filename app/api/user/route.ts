import prisma from "@/lib/prisma";
import { formSchema } from "@/lib/validations";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  return new Response("SSSSSSSSUP man");
}

export async function POST(request: Request, response: NextResponse) {
  const userInfo: unknown = await request.json();
  const parsedUserInfo = formSchema.safeParse(userInfo);

  if (!parsedUserInfo.success) {
    return NextResponse.json(parsedUserInfo.error, { status: 422 });
  }

  const user = await prisma.user.create({
    data: {
      email: parsedUserInfo.data.email,
      name: parsedUserInfo.data.name,
    },
  });

  return NextResponse.json({
    message: "user signed up successfully",
    username: parsedUserInfo.data.name,
    email: parsedUserInfo.data.email,
  });
}
