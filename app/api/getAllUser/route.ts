import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const GET = async () => {
  const allUsers = await prisma.user.findMany({});
  return NextResponse.json({ success: true, allUsers });
};
