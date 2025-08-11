"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /addProduct when app loads
    router.replace("/dashboard/addProduct");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-gray-600">Redirecting...</div>
    </div>
  );
}
