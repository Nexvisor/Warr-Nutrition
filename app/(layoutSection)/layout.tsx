import React from "react";
import Navbar from "../component/Navbar";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8f8f5]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

export default RootLayout;
