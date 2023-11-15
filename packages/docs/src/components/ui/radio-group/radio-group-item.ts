"use client";

import { RadioGroupItemPrimitive } from "@rpxl/recast-primitives";

export const RadioGroupItem = RadioGroupItemPrimitive.recast({
  base: {
    root: [
      "aspect-square",
      "h-4",
      "w-4",
      "rounded-full",
      "border",
      "border-primary",
      "text-primary",
      "shadow",
      "focus:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
    ],
    indicator: "flex items-center justify-center",
    icon: "h-3.5 w-3.5 fill-primary",
  },
});
