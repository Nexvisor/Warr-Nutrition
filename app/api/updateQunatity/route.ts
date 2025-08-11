import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const POST = async (req: NextRequest) => {
  try {
    // 1. Validate request body
    const { itemId, newQuantity } = await req.json();

    if (!itemId || typeof newQuantity !== "number" || newQuantity < 1) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid input: Provide valid itemId and quantity (minimum 1)",
        },
        { status: 400 }
      );
    }

    // 2. Check if cart item exists
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    if (!cartItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart item not found",
        },
        { status: 404 }
      );
    }

    // 3. Update quantity
    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: newQuantity },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Quantity updated successfully",
        data: { newQuantity },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};
