"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

export function MobileSearch() {
  const navigation = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => navigation.push("/Search")}
    >
      <Search className="h-5 w-5" />
    </Button>
  );
}
