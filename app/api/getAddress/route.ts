import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const params = Object.fromEntries(searchParams.entries());
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing userId" },
        { status: 400 }
      );
    }

    const userAddress = await prisma.user.findUnique({
      where: { id: userId },
      select: { address: true },
    });

    return NextResponse.json({
      success: true,
      address: userAddress?.address ?? [],
    });
  } catch (error) {
    console.error("Error fetching user address:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
