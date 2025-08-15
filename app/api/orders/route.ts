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
    const { totalPrice } = await req.json();

    if (!totalPrice) {
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

    return NextResponse.json({
      success: true,
      orderInfo: {
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
