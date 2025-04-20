import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      // Allow any HTTPS hostname
      {
        protocol: "https",
        hostname: "**", // Use wildcard for hostname
        port: "",
        pathname: "/**",
      },
  ]}
};

export default nextConfig;
