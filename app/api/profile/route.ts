import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { FormUserDetailSchema } from "@/lib/validations";
import { NextResponse } from "next/server";
import { parse } from "path";
import { z } from "zod";

export async function POST(request: Request, response: NextResponse) {
  // const userInfo: unknown = await request.json();
  // const session = await auth();
  // const user = session?.user;
  // if (!user) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }
  // const parsedUserProfileInfo = FormUserDetailSchema.safeParse(userInfo);
  // if (!parsedUserProfileInfo.success) {
  //   return NextResponse.json(parsedUserProfileInfo.error, { status: 422 });
  // }
  // const userProfile = await prisma.profile.create({
  //   data: {
  //     age: parseInt(parsedUserProfileInfo.data.age),
  //     gender: parsedUserProfileInfo.data.gender == "male" ? true : false,
  //     nationality: parsedUserProfileInfo.data.nationality,
  //     occupation: parsedUserProfileInfo.data.occupation,
  //     userId: user.id as string,
  //   },
  // });
  // console.log("user Data after posting: ", userProfile);
  // return NextResponse.json({
  //   message: "user details created successfully",
  //   userDetail: userProfile.id,
  // });
}
