import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const { orderId, orderStatus } = await req.json();

    if (!orderId || !orderStatus) {
      return NextResponse.json({ success: false, message: "Invalid input" });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: orderStatus },
    });

    return NextResponse.json({
      success: true,
      message: `Order status updated successfully for orderId: ${updatedOrder.id}`,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ success: false, message: "Order not found" });
    }
    console.error("Error updating order:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
};
