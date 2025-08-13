import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/utils/prisma";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const params = Object.fromEntries(searchParams.entries());
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing userId parameter",
        },
        { status: 400 }
      );
    }

    let orders = await prisma.order.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        total: true,
        items: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        status: true,
        addressId: true,
      },
    });

    const addressIds = orders.map((order) => order.addressId).filter(Boolean);

    const addresses = await prisma.address.findMany({
      where: {
        id: {
          in: addressIds,
        },
      },
    });

    orders = orders.map((order) => ({
      ...order,
      address:
        addresses.find((address) => address.id === order.addressId) || null,
    }));

    return NextResponse.json({
      success: true,
      orders: orders ?? [],
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching orders.",
      },
      { status: 500 }
    );
  }
};
