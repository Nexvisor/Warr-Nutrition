import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/utils/prisma";
import { notifySlack } from "@/helpers/notifySlack";
import { getHours, getMinutes } from "date-fns";

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
    const address = await prisma.address.findFirst({
      where: {
        id: addressId,
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

    // deleting cart items
    await prisma.cartItem.deleteMany({
      where: {
        cartId: cartId,
      },
    });

    // deleting cart products
    await prisma.cart.delete({
      where: {
        id: cartId,
      },
    });

    const userInfo = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      },
    });

    products.map(async (product: any) => {
      const message = `---- ORDER CONFIRM ----
        userId: ${userId}
        username: ${userInfo?.firstName} ${userInfo?.lastName}
        email: ${userInfo?.email}
        phone: ${userInfo?.phone}
        orderId: ${newOrder.id}
        productId: ${product?.product.id}
        quantity: ${product.quantity}
        price: ${product.product.price}
        address_1: ${address?.address1}
        address_2: ${address?.address2}
        pincode: ${address?.pincode}
        city: ${address?.city}
        state: ${address?.state}
        orderAt: ${getDateTime(newOrder.createdAt)}
    `;

      // Sending message to the slack of the WARR nutrition
      await notifySlack(message);
    });

    return NextResponse.json({
      success: true,
      message: "Order confirm",
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

function getDateTime(dateString: Date) {
  const dateInfo = new Date(dateString);
  let date = dateInfo.getDate();
  let month = dateInfo.getMonth() + 1;
  let year = dateInfo.getFullYear();

  let hours = getHours(dateInfo);
  let minutes = getMinutes(dateInfo);

  return `${date}-${month}-${year} ${hours}:${minutes}`;
}
