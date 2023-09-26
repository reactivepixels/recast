/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#6644D5",
        secondary: "#F34D7E",
        ink: "#181822",
        sand: "#E3DFDB",
        grey: "#D9D9D9",
        dark: "#0F172A",
        gradient: {
          primary: {
            start: "#6644D5",
            end: "#F34D7E",
          },
        },
      },
      maxWidth: {
        xxs: "480px",
        xs: "560px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1140px",
        xxl: "1280px",
        xxxl: "1440px",
      },
    },
  },
  plugins: [],
};
