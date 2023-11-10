"use client";

import { CheckboxPrimitive } from "@rpxl/recast-primitives";

export const Checkbox = CheckboxPrimitive.recast("Checkbox", {
  base: {
    root: [
      "peer",
      "h-4",
      "w-4",
      "shrink-0",
      "rounded-sm",
      "border",
      "border-primary",
      "shadow",
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
      "data-[state=checked]:bg-primary",
      "data-[state=checked]:text-primary-foreground",
    ],
    indicator: "flex items-center justify-center text-current",
    icon: "h-4 w-4",
  },
});
