import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ik.imagekit.io"],
  },
  output: "standalone", // This reduces deployment size
  eslint: {
    ignoreDuringBuilds: true, // Temporarily bypass ESLint error
  },
};

export default nextConfig;
