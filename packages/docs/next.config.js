const rehypePrettyCode = require("rehype-pretty-code");
const fs = require("fs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const options = {
  theme: JSON.parse(
    fs.readFileSync(require.resolve("./themes/moonlight-ii.json"), "utf-8")
  ),
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("line--highlighted");
  },
  onVisitHighlightedWord(node, id) {
    node.properties.className = ["word"];

    if (id) {
      const backgroundColor = {
        v: "rgb(196 42 94 / 59%)",
        s: "rgb(0 103 163 / 56%)",
        i: "rgb(100 50 255 / 35%)",
      }[id];

      const color = {
        v: "rgb(255 225 225 / 100%)",
        s: "rgb(175 255 255 / 100%)",
        i: "rgb(225 200 255 / 100%)",
      }[id];

      if (node.properties["data-rehype-pretty-code-wrapper"]) {
        node.children.forEach((childNode) => {
          childNode.properties.style = "";
        });
      }

      node.properties.style = `background-color: ${backgroundColor}; color: ${color};`;
    }
  },
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, options]],
    providerImportSource: "@mdx-js/react",
  },
});

module.exports = withMDX(nextConfig);
