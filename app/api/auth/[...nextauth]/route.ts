import NextAuth from "next-auth";
import { Next_Auth } from "@/utils/Next_Auth";

const handler = NextAuth(Next_Auth);

export const GET = handler;
export const POST = handler;
