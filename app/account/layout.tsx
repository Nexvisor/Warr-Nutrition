import React from "react";

import ProfileHeader from "../component/ProfileHeader";
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="w-full bg-gradient-to-br from-[#1e7ae4] to-[#052f5e] text-white  py-8">
        <div className="container mx-auto py-8 px-4 md:px-6">
          <ProfileHeader />
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
