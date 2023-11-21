/** @type {import('next').NextConfig} */

const { readFileSync } = require("fs");
const isProduction = process.env.NODE_ENV === "production";

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  mdxOptions: {
    rehypePrettyCodeOptions: {
      theme: JSON.parse(readFileSync("./public/syntax/editor.json", "utf8")),
    },
  },
});

module.exports = withNextra({
  output: "export",
  basePath: isProduction ? "/recast" : "",
  reactStrictMode: true,
  images: {
    // server side image optimization (https://nextjs.org/docs/api-reference/next/image#unoptimized)
    unoptimized: isProduction,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
});
