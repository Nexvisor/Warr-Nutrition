"use client";
import Loader from "@/app/component/Loader";

import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderDetail {
  orderId: string;
  userId: string;
  username: string;
  email: string;
  phone: string;
  title: string;
  weight: number;
  price: number;
  quantity: number;
  status: string;
  address1: string;
  address2?: string; // optional if not always present
  pincode: string;
  city: string;
  state: string;
  orderAt: Date;
}

const tableHeader = [
  "Order ID",
  "User ID",
  "Username",
  "Email",
  "Phone Number",
  "Product Title",
  "Weight",
  "User Paid",
  "Quantity",
  "Order Status",
  "Address 1",
  "Address 2",
  "Pincode",
  "City",
  "State",
  "Order At",
];

const ORDER_STATUS = ["PAID", "SHIPPED", "DELIVERED", "CANCELLED"];
export default function Orders() {
  const [allOrders, setAllOrders] = useState<OrderDetail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await axios.get("/api/getAllOrders");
        const allOrderInfo: OrderDetail[] = res.data.allOrders
          .map((order: any) => {
            const { id, userId, createdAt, status, items, address, user } =
              order;

            return items.map(
              (item: { quantity: number; product: any; price: number }) => {
                const { quantity, product, price } = item;
                const { title, weight } = product;
                const { address1, address2, pincode, city, state } = address;
                const { firstName, lastName, email, phone } = user;

                return {
                  orderId: id,
                  userId,
                  username: `${firstName} ${lastName}`,
                  email,
                  phone,
                  title,
                  weight,
                  price,
                  quantity,
                  status,
                  address1,
                  address2,
                  pincode,
                  city,
                  state,
                  orderAt: new Date(createdAt),
                } as OrderDetail;
              }
            );
          })
          .flat();

        setAllOrders(allOrderInfo);
      } catch (err: any) {
        console.error("Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to fetch orders");
      }
    });
  }, []);

  async function onStatusChange(updatedStatus: string, orderId: string) {
    await axios.post("/api/update-order-status", {
      orderId,
      orderStatus: updatedStatus,
    });

    const updatedOrders = allOrders.map((order: OrderDetail) => {
      if (order.orderId === orderId) {
        return { ...order, status: updatedStatus };
      }
      return order;
    });
    setAllOrders(updatedOrders);
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="flex py-6 px-8 justify-center items-center bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-4 w-full max-w-7xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800">All Orders</h2>

        <div className="border rounded-md overflow-hidden">
          {/* Scrollable container with both directions */}
          <div className="max-h-[500px] overflow-y-auto overflow-x-auto">
            {/* Sticky header row with custom widths */}
            <div className="grid min-w-[1600px] grid-cols-[160px_160px_140px_220px_150px_220px_120px_120px_100px_140px_240px_200px_120px_140px_140px_160px] bg-gray-100 sticky top-0 z-10 text-sm font-semibold text-gray-700">
              {tableHeader.map((header: string, index: number) => (
                <div
                  key={index}
                  className="px-4 py-3 border-b border-gray-200 text-center whitespace-nowrap"
                >
                  {header}
                </div>
              ))}
            </div>

            {/* Table body */}
            <div className="flex flex-col divide-y divide-gray-200 text-sm text-gray-700">
              {allOrders.length === 0 ? (
                <div className="px-4 py-6 text-center text-gray-500">
                  No orders found.
                </div>
              ) : (
                allOrders.map((info: OrderDetail, index: number) => (
                  <div
                    key={index}
                    className="grid min-w-[1600px] grid-cols-[160px_160px_140px_220px_150px_220px_120px_120px_100px_140px_240px_200px_120px_140px_140px_160px] hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="px-4 py-3 text-center">
                      {String(info.orderId).slice(9)}
                    </div>
                    <div className="px-4 py-3 text-center">
                      {String(info.userId).slice(9)}
                    </div>
                    <div className="px-4 py-3 text-center">{info.username}</div>
                    <div className="px-4 py-3 text-center">{info.email}</div>
                    <div className="px-4 py-3 text-center">{info.phone}</div>
                    <div className="px-4 py-3 text-center">{info.title}</div>
                    <div className="px-4 py-3 text-center">{info.weight}</div>
                    <div className="px-4 py-3 text-center">₹ {info.price}</div>
                    <div className="px-4 py-3 text-center">{info.quantity}</div>
                    <div className="px-4 py-3 text-center">
                      {info.status === "DELIVERED" ? (
                        <h2 className="bg-[#86EFAC] py-1 rounded-md">
                          DELIVERED
                        </h2>
                      ) : (
                        <Select
                          defaultValue={info.status}
                          onValueChange={(val: string) =>
                            onStatusChange(val, info.orderId)
                          }
                        >
                          <SelectTrigger
                            className={`rounded-md ${
                              info.status === "PAID"
                                ? "bg-[#34D399]"
                                : info.status === "SHIPPED"
                                ? "bg-[#818CF8]"
                                : info.status === "DELIVERED"
                                ? "bg-[#86EFAC]"
                                : info.status === "CANCELLED"
                                ? "bg-[#FB7185]"
                                : "bg-white"
                            }`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {ORDER_STATUS.map((status: string, index) => (
                                <SelectItem value={status} key={index}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    <div className="px-4 py-3 text-center">{info.address1}</div>
                    <div className="px-4 py-3 text-center">
                      {info.address2 || "-"}
                    </div>
                    <div className="px-4 py-3 text-center">{info.pincode}</div>
                    <div className="px-4 py-3 text-center">{info.city}</div>
                    <div className="px-4 py-3 text-center">{info.state}</div>
                    <div className="px-4 py-3 text-center">
                      {info.orderAt
                        ? format(new Date(info.orderAt), "dd/MM/yyyy")
                        : "N/A"}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
