"use client";
import { removeState } from "@/utils/DataSlice";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export function useSignOut() {
  const router = useRouter();
  const dispatch = useDispatch();

  async function signOutHandler() {
    await signOut({ redirect: false }); // Prevent automatic redirect
    dispatch(removeState());
    router.push("/"); // Manual redirect after sign out
  }

  return signOutHandler;
}
