"use client";
import React, { useEffect, useTransition } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ShoppingCart, User, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchDropdown } from "./SearchDropDown";
import { usePathname, useRouter } from "next/navigation";
import { useUserData } from "@/hooks/useUserData";
import getCart from "@/utils/getCart";
import { useDispatch, useSelector } from "react-redux";
import { Cart, setAddress, setCart, setOrders } from "@/utils/DataSlice";
import Image from "next/image";
import axios from "axios";

function Navbar() {
  const session = useSession();

  const dispatch = useDispatch();
  const navigation = useRouter();
  const { status } = session;
  const { userInfo } = useUserData();
  const [isPending, startTransition] = useTransition();
  const cart = useSelector((state: any) => state.dataSlice.cart) as Cart;
  const isFetch = useSelector((state: any) => state.dataSlice.isFetch);
  const pathname = usePathname();

  useEffect(() => {
    if (userInfo?.id) {
      startTransition(async () => {
        const cartProducts = await getCart(userInfo.id);
        dispatch(setCart(cartProducts));
      });
    }
  }, [userInfo, isFetch, dispatch]);

  useEffect(() => {
    if (!userInfo?.id) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const [addressRes, ordersRes] = await Promise.all([
          axios.get(`/api/getAddress?userId=${userInfo.id}`, {
            signal: controller.signal,
          }),
          axios.get(`/api/getOrder?userId=${userInfo.id}`, {
            signal: controller.signal,
          }),
        ]);

        dispatch(setAddress(addressRes.data.address));
        dispatch(setOrders(ordersRes.data.orders));
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          console.error("Error fetching data:", err);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [userInfo, isFetch, dispatch]);

  return (
    <header className="border-b sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between md:px-32">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="https://ik.imagekit.io/fcuhugcgk/WAR_Nutrition/Logo.pdf%20(1)%20(1).png?updatedAt=1747399698831"
            alt="Warr Nutrition"
            width={100}
            height={32}
            className="invert"
            style={{ filter: "invert(1) brightness(0)" }}
          />
        </Link>
        {pathname !== "/terms-conditon" && pathname !== "/about" && (
          <>
            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
              <SearchDropdown />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="https://verify.warrnutrition.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <Shield className="flex md:hidden" />
                <span className="hidden md:flex text-sm">Authenticity</span>
              </Link>
              {status === "authenticated" && (
                <>
                  <Link
                    href="/account"
                    className="flex items-center gap-1"
                    onClick={() => navigation.push("/account")}
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden md:block text-sm">Account</span>
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center gap-1 relative"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="hidden md:inline text-sm">Cart</span>
                    <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                      {/* checking cart is empty or not */}
                      {Array.isArray(cart?.items) && cart.items.length > 0
                        ? cart.items.length
                        : 0}
                    </Badge>
                  </Link>
                </>
              )}

              {status !== "authenticated" && (
                <Button
                  className="bg-gradient-to-br from-[#1e7ae4] to-[#052f5e] text-white px-6 py-2 rounded-md shadow-md hover:opacity-90 transition"
                  onClick={() => navigation.push("/Login")}
                >
                  Login / Sign Up
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
