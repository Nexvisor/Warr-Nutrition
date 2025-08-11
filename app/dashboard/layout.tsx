import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/component/app-sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 w-full bg-gray-50 overflow-auto">{children}</div>
      </div>
    </SidebarProvider>
  );
}
