import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const GET = async () => {
  const allOrders = await prisma.order.findMany({
    include: {
      addresses: {
        select: {
          address1: true,
          address2: true,
          pincode: true,
          city: true,
          state: true,
          userId: true,
          orderId: true,
          createdAt: true,
        },
      },
      items: {
        include: {
          product: {
            select: {
              id: true,
              title: true,
              description: true,
              weight: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json({ success: true, allOrders });
};
