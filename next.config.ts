import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next-dev",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "emiratespride.com",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
