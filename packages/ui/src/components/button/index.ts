"use client";

import { ButtonPrimitive } from "@rpxl/recast-primitives";

export const Button = ButtonPrimitive.recast({
  defaults: {
    variants: { variant: "default", size: "default" },
  },
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
      default: {
        root: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      secondary: {
        root: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      outline: {
        root: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      destructive: {
        root: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      ghost: {
        root: "hover:bg-accent hover:text-accent-foreground",
      },
      link: {
        root: "text-primary underline-offset-4 hover:underline",
      },
    },
    size: {
      default: { root: "h-10 px-4 py-2" },
      sm: { root: "h-9 rounded-md px-3" },
      lg: { root: "h-11 rounded-md px-8" },
      icon: { root: "h-10 w-10" },
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
});
