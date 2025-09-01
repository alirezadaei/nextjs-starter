import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/v1/:path*",
        destination: "https://gateway.saman.health/v1/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
