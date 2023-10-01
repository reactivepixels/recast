/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  // server side image optimization (https://nextjs.org/docs/api-reference/next/image#unoptimized)
  images: { unoptimized: isProduction },
  basePath: isProduction ? "/recast" : "",
};

module.exports = nextConfig;
