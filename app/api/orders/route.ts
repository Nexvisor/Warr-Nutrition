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
    return NextResponse.json(
      { success: false, message: "Unauthorized. Please log in." },
      { status: 401 }
    );
  }

  try {
    const { products, totalPrice, userId, addressId } = await req.json();

    if (!products?.length || !totalPrice || !userId || !addressId) {
      return NextResponse.json(
        { success: false, message: "Missing required order fields." },
        { status: 400 }
      );
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: totalPrice * 100, // in paisa
      currency: "INR",
      receipt: `receipt-${Date.now()}`,
    });

    // Create order in DB
    const newOrder = await prisma.order.create({
      data: {
        userId,
        total: totalPrice,
        razorpay_id: razorpayOrder.id,
        addressId,
      },
    });

    // Create order items
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
    console.error("Error creating order:", error);

    let message = "Something went wrong while creating the order.";
    let statusCode = 500;

    // Razorpay error handling
    if (error?.statusCode && error?.error?.description) {
      message = error.error.description;
      statusCode = error.statusCode;
    }
    // Prisma-specific error handling
    else if (error.code && error.meta) {
      message = `Database error: ${error.meta.cause || error.code}`;
    }
    // Axios/network-like errors
    else if (error?.message) {
      message = error.message;
    }

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: statusCode }
    );
  }
};
