import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  // Get query parameters from URL
  const { searchParams } = new URL(req.url);
  const params = Object.fromEntries(searchParams.entries());

  const { userId } = params;

  const cart = await prisma.cart.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      items: {
        select: {
          id: true,
          product: true,
          quantity: true,
        },
      },
    },
  });
  return NextResponse.json({ success: true, cart });
};
