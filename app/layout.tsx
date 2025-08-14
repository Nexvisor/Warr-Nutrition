import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/Providers";

import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/utils/ReduxProvider";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WARR NUTRITION - Premium Supplements for Athletes",
  description:
    "Premium nutrition supplements for fitness enthusiasts and athletes. Dominate your workout with WARR NUTRITION.",
  openGraph: {
    title: "WARR NUTRITION - Premium Supplements for Athletes",
    description:
      "Premium nutrition supplements for fitness enthusiasts and athletes. Dominate your workout with WARR NUTRITION.",
    url: "https://warrnutrition.com",
    siteName: "WARR NUTRITION",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ JSON-LD Brand Schema for Google */}
        <Script
          id="brand-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "WARR NUTRITION",
              url: "https://warrnutrition.com",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
        <Providers>
          <ReduxProvider>
            {children}
            <Toaster />
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
