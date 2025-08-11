import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const {
      title,
      description,
      keyBenefits, // Fixed typo
      productHighlights, // Fixed typo
      nutritionInformation, // Added missing field
      energy,
      category,
      imageUrls,
      price,
      discountPrice,
      stock,
      weight,
      flavor, // Fixed typo
    } = await req.json();

    // Validate required fields
    if (!title || !description || !category) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        energy: energy ?? "",
        category,
        imageUrls: imageUrls ?? [],
        price,
        discountPrice: discountPrice ?? 0,
        stock: stock ?? 0,
        weight: weight ?? "",
        flavor: flavor ?? "",
        productHighlights: productHighlights ?? [],
        // Create related records
        keyBenefits: {
          create:
            keyBenefits?.map((benefit: any) => ({
              topic: benefit.topic,
              description: benefit.description,
            })) ?? [],
        },
        nutritionInformation: {
          create:
            nutritionInformation?.map((nutrition: any) => ({
              nutrition: nutrition.nutrition,
              quantity: nutrition.quantity ?? null,
            })) ?? [],
        },
      },
      include: {
        keyBenefits: true,
        nutritionInformation: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
