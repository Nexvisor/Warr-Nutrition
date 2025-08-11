"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { useSignOut } from "@/hooks/SignOutHandler";
import { useState } from "react";
import { useSelector } from "react-redux";

import { ChevronLeft } from "lucide-react";
export default function ProfileHeader() {
  const signOutHandler = useSignOut();
  const userInfo = useSelector((state: any) => state.dataSlice.userInfo);
  const [tabs, setTab] = useState("Profile");

  return (
    <>
      <div className=" relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Link
          href="/"
          className="group inline-flex items-center text-white absolute top-[-2.5rem] hover:text-white/80 transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4 mr-1 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to Home
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My Account</h1>
          <p className="text-blue-100 mt-1">
            Welcome back, {`${userInfo?.firstName} ${userInfo?.lastName}`}
          </p>
        </div>
        <Button
          variant="outline"
          className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600 "
          onClick={signOutHandler}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="mt-8 border-b border-blue-600">
        <div className="flex justify-evenly font-medium text-lg md:justify-start gap-10 md:gap-10 p-5 text-white">
          <div>
            <Link
              href="/account"
              className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => setTab("Profile")}
            >
              Profile
            </Link>
            {tabs === "Profile" && (
              <div className="abosolute border-1 bg-white" />
            )}
          </div>
          <div>
            <Link
              href="/account/order"
              className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => setTab("My Orders")}
            >
              My Orders
            </Link>
            {tabs === "My Orders" && (
              <div className="abosolute border-1 bg-white" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
