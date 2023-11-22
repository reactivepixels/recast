"use client";

import { ButtonPrimitive } from "@rpxl/recast-primitives";

export const Button = ButtonPrimitive.recast({
  defaults: {
    variants: { variant: "primary", size: "md" },
  },
  base: {
    root: [
      "inline-flex",
      "items-center",
      "justify-center",
      "whitespace-nowrap",
      "rounded-md",
      "font-medium",
      "ring-offset-background",
      "transition-colors",
      "focus:ring-blue-300",
      "dark:focus:ring-blue-800",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-2",
      "disabled:pointer-events-none",
      "disabled:opacity-50",
      "w-full",
      "lg:w-auto",
    ],
  },
  variants: {
    variant: {
      primary: {
        root: "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl",
      },
      secondary: {
        root: "text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l",
      },
      outline: {
        root: "text-gray-900 bg-white hover:bg-gray-50 hover:border-gray-400 border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600",
      },
    },
    size: {
      sm: { root: "px-3 py-2 text-sm" },
      md: { root: "px-5 py-2.5 text-md" },
      lg: { root: "px-8 py-3.5 text-lg" },
    },
  },
  modifiers: {
    pill: {
      root: "rounded-full px-8",
    },
  },
});
