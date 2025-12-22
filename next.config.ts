import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // Phaser needs special handling for Next.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Add empty turbopack config to silence the warning
  // Phaser works better with webpack, so we'll use --webpack flag
  turbopack: {},
};

export default nextConfig;
