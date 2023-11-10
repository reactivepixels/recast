"use client";

import { BadgePrimitive } from "@rpxl/recast-primitives/badge";

export const Badge = BadgePrimitive.recast("Badge", {
  defaults: { variant: "default" },
  base: {
    root: [
      "inline-flex",
      "items-center",
      "rounded-md",
      "border",
      "px-2.5",
      "py-0.5",
      "text-xs",
      "font-semibold",
      "transition-colors",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-ring",
      "focus:ring-offset-2",
    ],
  },
  variant: {
    default: {
      root: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
    },
    destructive: {
      root: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
    },
    outline: {
      root: "text-foreground",
    },
    secondary: {
      root: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    },
  },
});
