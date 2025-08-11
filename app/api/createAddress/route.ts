import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const { userId, address1, address2, pincode, state, city } =
      await req.json();

    // Check for required fields
    if (!userId || !address1 || !pincode || !state || !city) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newAddress = await prisma.address.create({
      data: {
        userId,
        address1,
        address2: address2 || "",
        pincode,
        city,
        state,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Address created successfully",
      data: newAddress,
    });
  } catch (error) {
    console.error("Error creating address:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create address", error },
      { status: 500 }
    );
  }
};
