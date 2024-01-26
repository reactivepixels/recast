import type { Config } from "tailwindcss";

const config: Config = {
  important: "#docs",
  darkMode: ["class", 'html[class~="dark"]'],
  content: ["src/**/*.{ts,tsx,md,mdx}"],
};

export default config;
