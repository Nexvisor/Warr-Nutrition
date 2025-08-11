import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/utils/prisma";
import * as bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
export const Next_Auth: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "John@example.com",
        },

        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentails: any) {
        if (!credentails?.email || !credentails?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentails.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(
          credentails.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 🕐 1 hour session expiry (in seconds)
  },
  jwt: {
    maxAge: 60 * 60, // 🕐 1 hour session expiry (in seconds)
  },
  callbacks: {
    jwt: ({ token, user }) => {
      // Persist user data to the token right after sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, token }) => {
      // Send user properties to the client
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }

      return session;
    },
  },
  pages: {
    signIn: "/Login",
  },
};
