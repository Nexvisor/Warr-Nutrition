"use client";

import type React from "react";

import Link from "next/link";
import { Dumbbell, ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import PasswordInput from "../component/PasswordInput";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";

export default function LoginPage() {
  const navigation = useRouter();
  const [isPending, startTransition] = useTransition();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (res?.error) {
          toast.success("Issue In Login", {
            description: res.error,
            position: "bottom-right",
            duration: 3000,
            className: "bg-red-700 text-white border border-red-600",
            style: {
              backgroundColor: "#C1292E",
              color: "white",
              border: "1px solid #3e5692",
            },
          });
          throw new Error(res.error);
        }
        console.log(res);

        if (res?.ok) {
          toast.success("Login Successfull", {
            position: "bottom-right",
            duration: 3000,
            className: "bg-green-700 text-white border border-green-600",
            style: {
              backgroundColor: "#285943",
              color: "white",
              border: "1px solid #3e5692",
            },
          });
          navigation.push("/"); // or your desired redirect path
        }
      } catch (error: any) {
        toast.success("Issue In Login", {
          description: error.message,
          position: "bottom-right",
          duration: 3000,
          className: "bg-red-700 text-white border border-red-600",
          style: {
            backgroundColor: "#C1292E",
            color: "white",
            border: "1px solid #3e5692",
          },
        });
      }
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8f5]">
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center text-[#0047AB] hover:text-[#003380]"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="relative bg-gradient-to-br from-[#1e7ae4] to-[#052f5e] text-white px-6 py-2 rounded-md shadow-md hover:opacity-90 transition">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#00A3FF]/30 blur-2xl"></div>
              <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-[#0047AB]/30 blur-2xl"></div>
              <div className="relative">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <div className="h-15 w-15 overflow-hidden flex items-center justify-center rounded-full ">
                    <Image
                      src="https://ik.imagekit.io/fcuhugcgk/WAR_Nutrition/Warr%20Logo.jpg?updatedAt=1747399403846"
                      alt="Warr nutrition"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <h1 className="mt-4 text-2xl font-bold text-center">
                  WARR NUTRITION
                </h1>
                <p className="mt-1 text-sm text-white/80 text-center">
                  Sign in to your account
                </p>
              </div>
            </div>

            <div className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Email
                          </FormLabel>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            className="rounded-lg border-gray-300 bg-gray-50 focus:border-[#0047AB] focus:ring-[#0047AB]"
                            {...field}
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Password</FormLabel>
                          <PasswordInput {...field} />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-br from-[#1e7ae4] to-[#052f5e] text-white px-6 py-2 rounded-md shadow-md hover:opacity-90 transition"
                  >
                    <h2>
                      {isPending ? (
                        "PLEASE WAIT...."
                      ) : (
                        <div className="flex gap-2 items-center">
                          SIGN IN <ArrowRight className="ml-2 h-4 w-4" />{" "}
                        </div>
                      )}
                    </h2>
                  </Button>
                </form>
              </Form>
            </div>

            <div className="border-t bg-gray-50 p-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/Signup"
                  className="font-bold text-[#0047AB] hover:underline"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
