import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.gutenberg.org",
      },
      {
        protocol: "https",
        hostname: "www.gutenberg.org",
      },
    ],
  },
};

export default nextConfig;
