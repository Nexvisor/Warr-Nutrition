"use client";

import { Plus, List, LogOut, Utensils } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/SignOutHandler";

const navigationItems = [
  {
    title: "Add New Product",
    url: "/dashboard/addProduct",
    icon: Plus,
  },
  {
    title: "Product List",
    url: "/dashboard/productList",
    icon: List,
  },
];

export function AppSidebar() {
  const signOutHandler = useSignOut();
  const pathname = usePathname();

  return (
    <Sidebar
      className="bg-gradient-to-br from-[#1e7ae4] to-[#052f5e] border-r-0"
      collapsible="none"
    >
      {/* Header with WARR title */}
      <SidebarHeader className="border-b border-white/10 ">
        <div className="flex flex-col font-bold text-white tracking-wide items-center">
          <h1 className="text-3xl ">WARR </h1>
          <h1 className="text-md">Nutirtion</h1>
        </div>
      </SidebarHeader>

      {/* Navigation Links */}
      <SidebarContent className="flex-1 p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`text-white hover:bg-white/20 hover:text-white transition-all duration-200 py-3 px-4 rounded-lg ${
                      pathname === item.url
                        ? "bg-white/20 text-white font-medium"
                        : ""
                    }`}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Nutrition and Logout */}
      <SidebarFooter className="border-t border-white/10 p-6 space-y-4">
        {/* Nutrition Label */}
        <div className="flex items-center gap-3 text-white/80">
          <Utensils className="h-5 w-5" />
          <span className="text-base font-medium">Nutrition</span>
        </div>

        {/* Logout Button */}
        <Button
          onClick={signOutHandler}
          variant="outline"
          className="w-full bg-transparent border-white/30 text-white hover:bg-white/20 hover:text-white hover:border-white/50 transition-all duration-200 py-2"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
