import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

type AuthToken = {
  email: string;
  sub: string;
  id: string;
  role: "USER" | "ADMIN";
  iat: number;
  exp: number;
  jti: string;
};

export async function middleware(req: NextRequest) {
  const token = (await getToken({ req, secret })) as AuthToken | null;

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  if (token?.role === "ADMIN" && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (token?.role === "USER" && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
