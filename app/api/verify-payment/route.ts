import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/utils/prisma";
export const POST = async (req: NextRequest) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, cartId } =
      await req.json();

    if (
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature ||
      !cartId
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

    const order = await prisma.order.findFirst({
      where: {
        razorpay_id: razorpayOrderId,
      },
    });
    if (order) {
      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          status: "PAID",
        },
      });
      await prisma.cartItem.deleteMany({
        where: {
          cartId: cartId,
        },
      });
      return NextResponse.json({
        success: true,
        message: "Order confirm",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "order not found",
      });
    }
  } catch (error: any) {
    console.log(error.message);
  }
};
