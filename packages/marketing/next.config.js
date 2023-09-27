/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: { unoptimized: isProduction },
  basePath: isProduction ? "/recast" : "",
};

module.exports = nextConfig;
