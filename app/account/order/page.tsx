"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import { Package, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "@/utils/DataSlice";

export default function Orders() {
  const router = useRouter();
  const orders = useSelector((state: any) => state.dataSlice.orders);
  function getOrderTotal(order: Order) {
    const total = order.items.reduce((acc, item) => {
      let price = order.total * item.quantity;
      acc = acc + price;
      return acc;
    }, 0);
    return total;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
          <p className="text-gray-500 mt-1">
            When you place orders, they will appear here
          </p>
          <Button
            className="mt-4 bg-blue-700 hover:bg-blue-800"
            onClick={() => router.push("/")}
          >
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: Order) => (
            <Card key={order.id} className="overflow-hidden">
              <div className="bg-blue-50 p-4 flex justify-between items-center border-b">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">
                      ord_{String(order.id).slice(0, 8)}
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  {order.items.map((item: OrderItem, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {item.product?.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-gray-900">
                        ₹{order.total * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center flex-wrap p-2">
                      <span className="flex items-center gap-2 space-y-1">
                        <Building /> {order.address?.address1}
                      </span>
                      <span>{order.address?.address2}</span>
                      <span>{order.address?.pincode}</span>
                      <span>{order.address?.city}</span>
                      <span>{order.address?.state}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-lg font-bold text-gray-900">
                      ₹{getOrderTotal(order)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
