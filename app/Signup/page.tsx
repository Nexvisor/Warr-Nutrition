"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import { ArrowRight, ChevronLeft, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "../component/PasswordInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { toast } from "sonner";

// Schema
const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10).max(10).regex(/^\d+$/, "Phone must be digits"),
    password: z.string().min(6, "Password should be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignupPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        const res = await axios.post("/api/signup", {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          phone: values.phone,
        });

        if (res.data.success) {
          router.push("/Login");

          toast.success("Sign Up Successful", {
            position: "bottom-right",
            duration: 3000,
            className: "bg-green-700 text-white border border-green-600",
            style: {
              backgroundColor: "#285943",
              color: "white",
              border: "1px solid #3e5692",
            },
          });
        } else {
          toast.error("Sign Up Failed", {
            description: res.data.message || "Something went wrong",
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
      } catch (error: any) {
        let message = "Something went wrong";

        if (axios.isAxiosError(error)) {
          if (error.response) {
            // Server returned an error
            message =
              error.response.data?.message ||
              `Server Error: ${error.response.status}`;
          } else if (error.request) {
            // No response from server
            message =
              "No response from server. Please check your internet connection.";
          } else {
            // Something else happened while setting up request
            message = error.message;
          }
        } else {
          message = error?.message || message;
        }

        toast.error("Sign Up Failed", {
          description: message,
          position: "bottom-right",
          duration: 3000,
          className: "bg-red-700 text-white border border-red-600",
          style: {
            backgroundColor: "#C1292E",
            color: "white",
            border: "1px solid #3e5692",
          },
        });

        console.log("Signup error", error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f8f5]">
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center text-[#0047AB] hover:text-[#003380]"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid overflow-hidden rounded-2xl shadow-xl lg:grid-cols-5">
            {/* Left Panel */}
            <div className="relative hidden bg-gradient-to-br from-[#001F3F] to-[#0047AB] lg:col-span-2 lg:block">
              <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute h-full w-full bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-30"></div>
              </div>
              <div className="relative z-10 flex h-full flex-col gap-12 p-12 text-white">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <div className="h-12 w-12  overflow-hidden flex items-center justify-center rounded-full ">
                      <Image
                        src="https://ik.imagekit.io/fcuhugcgk/WAR_Nutrition/Warr%20Logo.jpg?updatedAt=1747399403846"
                        alt="Warr nutrition"
                        width={120}
                        height={120}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h1 className="mt-6 text-3xl font-bold">WARR NUTRITION</h1>
                  <p className="mt-2 text-white/80">
                    Join the elite. Fuel your performance.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold">
                      Why athletes choose WARR
                    </h2>
                    <div className="space-y-4">
                      {[
                        "Pharmaceutical-grade ingredients",
                        "Scientifically proven formulas",
                        "Trusted by professional athletes",
                        "No fillers or artificial additives",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#00A3FF]">
                            <Check className="h-3.5 w-3.5 text-white" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="bg-white p-8 lg:col-span-3">
              <div className="mx-auto max-w-md">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Create your account
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Join WARR NUTRITION and start your journey to peak
                    performance
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-8 space-y-6"
                  >
                    <div className="space-y-4">
                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        {["firstName", "lastName"].map((fieldName) => (
                          <FormField
                            key={fieldName}
                            control={form.control}
                            name={fieldName as "firstName" | "lastName"}
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-medium text-gray-700">
                                  {fieldName === "firstName"
                                    ? "First name"
                                    : "Last name"}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className="rounded-lg border-gray-300 bg-gray-50 focus:border-[#0047AB] focus:ring-[#0047AB]"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>

                      {/* Phone & Email */}
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Phone number</FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  inputMode="numeric"
                                  maxLength={10}
                                  {...field}
                                  className="rounded-lg border-gray-300 bg-gray-50 focus:border-[#0047AB] focus:ring-[#0047AB]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  {...field}
                                  className="rounded-lg border-gray-300 bg-gray-50 focus:border-[#0047AB] focus:ring-[#0047AB]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Password Fields */}
                      {["password", "confirmPassword"].map((name) => (
                        <FormField
                          key={name}
                          control={form.control}
                          name={name as "password" | "confirmPassword"}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>
                                {name === "password"
                                  ? "Password"
                                  : "Confirm password"}
                              </FormLabel>
                              <FormControl>
                                <PasswordInput
                                  {...field}
                                  className="rounded-lg border-gray-300 bg-gray-50 focus:border-[#0047AB] focus:ring-[#0047AB]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-br from-[#1e7ae4] to-[#052f5e] text-white px-6 py-2 rounded-md shadow-md hover:opacity-90 transition"
                    >
                      {isPending ? (
                        <span>PLEASE WAIT...</span>
                      ) : (
                        <span className="flex gap-2 items-center justify-center">
                          CREATE ACCOUNT
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/Login"
                      className="font-bold text-[#0047AB] hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            {/* End Form Panel */}
          </div>
        </div>
      </div>
    </div>
  );
}
