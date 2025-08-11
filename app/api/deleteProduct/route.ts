import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Step 1: Check if product exists in any CartItem
    const cartItemCount = await prisma.cartItem.count({
      where: {
        productId: id,
      },
    });

    // Step 2: If found, delete CartItems
    if (cartItemCount > 0) {
      await prisma.cartItem.deleteMany({
        where: {
          productId: id,
        },
      });
    }

    // Step 3: Delete the product
    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete product" },
      { status: 500 }
    );
  }
};
