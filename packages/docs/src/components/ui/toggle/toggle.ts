"use client";

import { TogglePrimitive } from "@rpxl/recast-primitives";

export const Toggle = TogglePrimitive.recast({
  defaults: { variants: { variant: "default", size: "default" } },
  base: {
    root: [
      "inline-flex",
      "items-center",
      "justify-center",
      "rounded-md",
      "text-sm",
      "font-medium",
      "transition-colors",
      "hover:bg-muted",
      "hover:text-muted-foreground",
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",
      "disabled:pointer-events-none",
      "disabled:opacity-50",
      "data-[state=on]:bg-accent",
      "data-[state=on]:text-accent-foreground",
    ],
  },
  variants: {
    variant: {
      default: {
        root: "bg-transparent",
      },
      outline: {
        root: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
    },
    size: {
      default: { root: "h-9 px-3" },
      sm: { root: "h-8 px-2" },
      lg: { root: "h-10 px-3" },
    },
  },
});
