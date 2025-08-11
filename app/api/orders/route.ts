import { Next_Auth } from "@/utils/Next_Auth";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.Key_Id!,
  key_secret: process.env.Secret_key!,
});

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(Next_Auth);
  if (!session) {
    return NextResponse.redirect(new URL("/Login", req.url)); // Proper redirect syntax
  }

  try {
    const { products, totalPrice, userId, addressId } = await req.json();

    const razorpayOrder = await razorpay.orders.create({
      amount: totalPrice * 100, // In paisa
      currency: "INR",
      receipt: `reciept-${Date.now()}`,
      // notes: {
      //   productIds: products.id.join(","),
      // },
    });

    const newOrder = await prisma.order.create({
      data: {
        userId,
        total: totalPrice,
        razorpay_id: razorpayOrder.id,
        addressId,
      },
    });

    await Promise.all(
      products.map((product: any) =>
        prisma.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: product.product.id,
            quantity: product.quantity,
            price: product.product.price,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      orderInfo: {
        orderId: newOrder.id,
        amount: razorpayOrder.amount,
        razorpayOrderId: razorpayOrder.id,
        currency: razorpayOrder.currency,
      },
    });
  } catch (error: any) {
    console.log(`Error in creating Order ${error.message}`);
  }
};
