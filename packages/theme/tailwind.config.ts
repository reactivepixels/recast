import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-dm-sans)", "sans-serif"],
      mono: ["var(--font-fira-code)", "monospace"],
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          900: "hsl(var(--primary-hue), var(--primary-saturation), 20%)",
          800: "hsl(var(--primary-hue), var(--primary-saturation), 30%)",
          700: "hsl(var(--primary-hue), var(--primary-saturation), 40%)",
          600: "hsl(var(--primary-hue), var(--primary-saturation), 50%)",
          500: "hsl(var(--primary-hue), var(--primary-saturation), 60%)",
          DEFAULT: "hsl(var(--primary-hue), var(--primary-saturation), 60%)",
          400: "hsl(var(--primary-hue), var(--primary-saturation), 70%)",
          300: "hsl(var(--primary-hue), var(--primary-saturation), 80%)",
          200: "hsl(var(--primary-hue), var(--primary-saturation), 90%)",
          100: "hsl(var(--primary-hue), var(--primary-saturation), 95%)",
        },
        text: "hsl(var(--primary-hue), var(--primary-saturation), 95%)",
      },
      fontSize: {
        "2xs": "10px",
      },
      borderRadius: {
        inherit: "inherit",
      },
      boxShadow: {
        inset: `inset 0 0 0 1px hsla(var(--primary-hue), var(--primary-saturation), 90%, 0.1)`,
        bevel: `inset 0 1px 1px 0 hsla(var(--primary-hue), var(--primary-saturation), 90%, 0.4), inset 0 24px 48px 0 hsla(var(--primary-hue), var(--primary-saturation), 70%, 0.15), inset 0 0 0 1px hsla(var(--primary-hue), var(--primary-saturation), 70%, 0.15)`,
        "inner-glow": `inset 0 1px 1px 0 hsla(var(--primary-hue), var(--primary-saturation), 60%, 0.2), inset 0 24px 48px 0 hsla(var(--primary-hue), var(--primary-saturation), 60%, 0.05), 0 16px 32px rgba(0, 0, 0, 0.3)`,
        // inset_0_1px_1px_0_hsla(var(--primary),0.2),inset_0_24px_48px_0_hsla(var(--primary),0.05),0_16px_32px_rgba(0,0,0,0.3)]",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
