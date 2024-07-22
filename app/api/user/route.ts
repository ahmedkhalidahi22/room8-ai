import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: NextResponse) {
  const user = await prisma.user.findFirst();
  console.log(user);
}
