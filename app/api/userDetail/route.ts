import prisma from "@/lib/prisma";
import { userDetailSchema } from "@/lib/validations";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  return new Response("SSSSSSSSUP man");
}

export async function POST(request: Request, response: NextResponse) {
  const userInfo: unknown = await request.json();
  const parsedUserDetail = userDetailSchema.safeParse(userInfo);

  if (!parsedUserDetail.success) {
    return NextResponse.json(parsedUserDetail.error, { status: 422 });
  }

  const userDetail = await prisma.userDetail.create({
    data: {
      age: parsedUserDetail.data.age,
      gender: parsedUserDetail.data.gender == "male" ? true : false,
      nationality: parsedUserDetail.data.nationality,
      occupation: parsedUserDetail.data.occupation,
      userId: parsedUserDetail.data.userId,
    },
  });

  return NextResponse.json({
    message: "user details created successfully",
    userDetail: userDetail.id,
  });
}
