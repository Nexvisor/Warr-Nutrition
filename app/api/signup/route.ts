import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import * as bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const { firstName, lastName, email, phone, password } = await req.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phone) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if email or phone already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      const isEmailTaken = existingUser.email === email;
      const isPhoneTaken = existingUser.phone === phone;

      return NextResponse.json(
        {
          success: false,
          message: isEmailTaken
            ? "Email already in use"
            : isPhoneTaken
            ? "Phone number already in use"
            : "Email or phone already in use",
        },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashPassword,
        role: "USER",
      },
    });
    return NextResponse.json({
      success: true,
      message: "Signup successful!",
    });
  } catch (error) {
    console.error("User registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 } // Internal server error
    );
  }
};
