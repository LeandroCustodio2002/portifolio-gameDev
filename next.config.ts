import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portifolio-gameDev",
  assetPrefix: "/portifolio-gameDev",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;