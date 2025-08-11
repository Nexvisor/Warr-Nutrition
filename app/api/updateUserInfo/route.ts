import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { id, firstName, lastName, email, phone } = await req.json();

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        email,
        phone,
      },
    });

    return NextResponse.json({ success: true, message: "Profile Updated" });
  } catch (error: any) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
