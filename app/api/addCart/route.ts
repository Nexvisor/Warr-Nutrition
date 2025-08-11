import { Next_Auth } from "@/utils/Next_Auth";
import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(Next_Auth);

  // 🔐 Redirect unauthenticated users
  if (!session || !session.user?.email) {
    return NextResponse.json({ success: false, redirectTo: "/login" });
  }
  try {
    const { userId, productId, quantity } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { success: false, message: "Invalid Input" },
        { status: 400 }
      );
    }

    // Check if cart already exists for user
    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {}, // no update needed if cart exists
      create: { userId },
    });

    // Add item to the cart
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: quantity ?? 1,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product is added to cart",
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add product to cart",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};
