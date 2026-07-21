import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backsakanca-production.up.railway.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.sakanca.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sakanca.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
