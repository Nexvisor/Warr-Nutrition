"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SearchDropdown } from "../component/SearchDropDown";
export default function SearchCompo() {
  const navigation = useRouter();
  return (
    <div className="md:hidden">
      <div className="fixed inset-0 bg-white z-50 p-4">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigation.push("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="ml-2 font-medium">Search</span>
        </div>
        <SearchDropdown />
      </div>
    </div>
  );
}
