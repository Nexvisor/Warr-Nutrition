"use client";
import Loader from "@/app/component/Loader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import { format } from "date-fns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="flex py-6 px-8 justify-center items-center">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-xl font-bold">All Orders</h2>
        <ScrollArea className="h-[450px] w-[99%] rounded-md border whitespace-nowrap">
          {error ? (
            <div className="text-red-500 font-medium">{error}</div>
          ) : (
            <Table>
              {allOrders.length === 0 && !isPending && !error && (
                <TableCaption>No orders found.</TableCaption>
              )}

              <TableHeader>
                <TableRow>
                  {tableHeader.map((header: string, index) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="w-full px-4 py-5">
                {allOrders?.map((info: OrderDetail, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{info.orderId}</TableCell>
                    <TableCell>{info.userId}</TableCell>
                    <TableCell>{info.username}</TableCell>
                    <TableCell>{info.email}</TableCell>
                    <TableCell>{info.phone}</TableCell>
                    <TableCell>{info.title}</TableCell>
                    <TableCell>{info.weight}</TableCell>
                    <TableCell>₹ {info.price}</TableCell>
                    <TableCell>{info.quantity}</TableCell>
                    <TableCell>{info.status}</TableCell>
                    <TableCell>{info.address1}</TableCell>
                    <TableCell>{info.address2 || "-"}</TableCell>
                    <TableCell>{info.pincode}</TableCell>
                    <TableCell>{info.city}</TableCell>
                    <TableCell>{info.state}</TableCell>
                    <TableCell>
                      {info.orderAt
                        ? format(new Date(info.orderAt), "dd/MM/yyyy")
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
