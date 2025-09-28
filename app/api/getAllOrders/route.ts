import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { Phone } from "lucide-react";

export const GET = async () => {
  let allOrders = await prisma.order.findMany({
    include: {
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
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  const addressIds = allOrders.map((order) => order.addressId).filter(Boolean);
  const addresses = await prisma.address.findMany({
    where: {
      id: {
        in: addressIds,
      },
    },
  });
  allOrders = allOrders.map((order) => ({
    ...order,
    address:
      addresses.find((address) => address.id === order.addressId) || null,
  }));

  return NextResponse.json({ success: true, allOrders });
};
