import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/utils/prisma";
export const POST = async (req: NextRequest) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      cartId,
      products,
      totalPrice,
      userId,
      addressId,
    } = await req.json();

    if (
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature ||
      !cartId ||
      !products?.length ||
      !totalPrice ||
      !userId ||
      !addressId
    ) {
      return NextResponse.json({ success: false, message: "Invalid inputs" });
    }
    // 1. Verify the signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.Secret_key!)
      .update(razorpayOrderId + "|" + razorpayPaymentId)
      .digest("hex");

    console.log({ expectedSignature, razorpaySignature });

    if (razorpaySignature !== expectedSignature) {
      return NextResponse.json(
        { success: false, message: "Invalid Signature" },
        { status: 401 }
      );
    }

    // Create order in DB
    const newOrder = await prisma.order.create({
      data: {
        userId,
        total: totalPrice,
        razorpay_id: razorpayOrderId,
        addressId,
        status: "PAID",
      },
    });

    // Create order items
    await prisma.orderItem.createMany({
      data: products.map((product: any) => ({
        orderId: newOrder.id,
        productId: product.product.id,
        quantity: product.quantity,
        price: product.product.price,
      })),
    });

    return NextResponse.json({
      success: true,
      message: "Order confirm",
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
