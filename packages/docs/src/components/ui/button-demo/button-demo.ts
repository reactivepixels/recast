"use client";

import { ButtonPrimitive } from "@rpxl/recast-primitives";
import { recast } from "@rpxl/recast";

export const Button = recast(ButtonPrimitive, {
  base: [
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
  ],
  variants: {
    variant: {
      primary: [
        "bg-gradient-to-br",
        "from-purple-600",
        "to-blue-500",
        "text-white",
        "hover:bg-gradient-to-bl",
      ],
      secondary: [
        "bg-gradient-to-r",
        "from-purple-500",
        "to-pink-500",
        "text-white",
        "hover:bg-gradient-to-l",
      ],
      outline: [
        "border",
        "border-gray-300",
        "bg-white",
        "text-gray-900",
        "hover:border-gray-400",
        "hover:bg-gray-50",
        "dark:border-gray-600",
        "dark:bg-gray-800",
        "dark:text-white",
        "dark:hover:border-gray-600",
        "dark:hover:bg-gray-700",
      ],
    },
    size: {
      sm: "px-3 py-2 text-sm",
      md: "text-md px-5 py-2.5",
      lg: "px-8 py-3.5 text-lg",
    },
  },
  modifiers: {
    pill: "!rounded-full !px-8",
    block: "w-full",
    floating: "shadow-lg",
  },
  conditionals: [
    {
      variants: { size: "lg" },
      modifiers: ["floating"],
      className: "border-4 border-blue-500 text-white",
    },
  ],
});
