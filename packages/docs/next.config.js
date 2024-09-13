/** @type {import('next').NextConfig} */

const { readFileSync } = require("fs");
const isProduction = process.env.NODE_ENV === "production";

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  // mdxOptions: {
  //   rehypePrettyCodeOptions: {
  //     themes: {
  //       light: "github-light",
  //       dark: "github-dark",
  //       dim: "github-dimmed",
  //     },
  //   },
  // },
  // mdxOptions: {
  //   rehypePrettyCodeOptions: {
  //     theme: JSON.parse(readFileSync("./public/syntax/editor.json", "utf8")),
  //   },
  // },
});

module.exports = withNextra({
  output: isProduction ? "export" : "standalone",
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
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
});
