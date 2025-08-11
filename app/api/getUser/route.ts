import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters from URL
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const { id } = params;

    if (!id)
      return NextResponse.json({ success: false, message: "invalid inputs" });

    const userInfo = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        firstName: true,
        lastName: true,
        phone: true,
      },
    });

    if (!userInfo) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    return NextResponse.json({ success: true, userInfo });
  } catch (error: any) {
    console.error("Error in API route:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
