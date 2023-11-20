/** @type {import('next').NextConfig} */

const { readFileSync } = require("fs");

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
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
});
