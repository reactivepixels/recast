import type { Config } from "tailwindcss";
import recastTailwindPlugin from "@rpxl/recast-tailwind";

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: breakpoints,
    },
  },
  plugins: [recastTailwindPlugin],
};

export default config;
