import { NextResponse } from "next/server";

export const GET = () => {
  const key_id = process.env.Key_Id!;
  return NextResponse.json({ success: true, key_id });
};
