import type { Config } from "tailwindcss";
import recastTailwindPlugin from "./lib/recast-tailwind-plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [recastTailwindPlugin],
};
export default config;
