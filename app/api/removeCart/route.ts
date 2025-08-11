import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    // id refers to the id of the cart item, not the cart itself
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invalid input: cart item ID is required" },
        { status: 400 }
      );
    }

    await prisma.cartItem.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Product removed from cart",
    });
  } catch (error) {
    console.error("Error removing product from cart:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to remove product from cart",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};
