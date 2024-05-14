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

  return NextResponse.json({
    message: "user signed up successfully",
    username: parsedUserInfo.data.name,
  });
}
