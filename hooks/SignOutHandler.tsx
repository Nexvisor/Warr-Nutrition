"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useSignOut() {
  const router = useRouter();

  async function signOutHandler() {
    await signOut({ redirect: false }); // Prevent automatic redirect
    router.push("/"); // Manual redirect after sign out
  }

  return signOutHandler;
}
