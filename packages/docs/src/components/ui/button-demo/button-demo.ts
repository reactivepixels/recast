"use client";

import { ButtonPrimitive } from "@rpxl/recast-primitives";

export const Button = ButtonPrimitive.recast({
  base: {
    root: [
      "inline-flex",
      "items-center",
      "justify-center",
      "whitespace-nowrap",
      "rounded-md",
      "text-sm",
      "font-medium",
      "ring-offset-background",
      "transition-colors",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-2",
      "disabled:pointer-events-none",
      "disabled:opacity-50",
    ],
  },
  variants: {
    variant: {
      primary: {
        root: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      secondary: {
        root: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      outline: {
        root: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
    },
    size: {
      sm: { root: "h-9 rounded-md px-3" },
      md: { root: "h-10 px-4 py-2" },
      lg: { root: "h-11 rounded-md px-8" },
    },
  },
  modifiers: {
    block: {
      root: ["w-full"],
    },
    floating: {
      root: "shadow-lg",
    },
  },
  conditionals: [
    {
      variants: { size: "lg" },
      modifiers: ["floating"],
      classes: { root: "bg-green-500 text-white" },
    },
  ],
});
