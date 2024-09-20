import type { Config } from "tailwindcss";
import recastTailwindPlugin from "@rpxl/recast-tailwind-plugin";

/**
 * Breakpoints configuration object
 * @type {const} Ensures TypeScript treats this as a readonly object with literal types
 */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

/**
 * Tailwind CSS configuration object
 * @type {import('tailwindcss').Config}
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /**
       * Screen breakpoints configuration
       * @type {typeof breakpoints}
       */
      screens: breakpoints,
    },
  },
  /**
   * Recast plugin initialization
   * @type {import('tailwindcss/plugin')}
   */
  plugins: [recastTailwindPlugin],
};

export default config;
