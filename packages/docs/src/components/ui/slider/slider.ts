"use client";

import { SliderPrimitive } from "@rpxl/recast-primitives";

export const Slider = SliderPrimitive.recast({
  base: {
    root: "relative flex w-full touch-none select-none items-center",
    track:
      "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
    range: "absolute h-full bg-primary",
    thumb: [
      "block",
      "h-4",
      "w-4",
      "rounded-full",
      "border",
      "border-primary/50",
      "bg-background",
      "shadow",
      "transition-colors",
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",
      "disabled:pointer-events-none",
      "disabled:opacity-50",
    ],
  },
});
