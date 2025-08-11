import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const allProducts = await prisma.product.findMany({
      where: {},
      include: {
        nutritionInformation: {
          select: {
            id: true,
            nutrition: true,
            quantity: true,
          },
        },
        keyBenefits: {
          select: {
            id: true,
            topic: true,
            description: true,
          },
        },
      },
    });
    return NextResponse.json({ success: true, allProducts });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
};
