"use client";

import { recast } from "@rpxl/recast";
import { SwitchPrimitive } from "@rpxl/recast-primitives";

export const Switch = recast(SwitchPrimitive, {
  base: {
    root: [
      "peer",
      "transition-all",
      "backdrop-blur",
      "bg-primary-300/5",
      "data-[state=checked]:bg-primary-500/10",
      "cursor-pointer",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
      "focus-visible:outline-2",
      "focus-visible:outline-none",
      "focus-visible:outline-offset-4",
      "focus-visible:outline-blue-500/50",
      "h-9",
      "p-1",
      "relative",
      "rounded-full",
      "shadow-inset",
      "w-16",
    ],
    thumb: [
      "bg-primary-300/5",
      "transition-all",
      "data-[state=checked]:bg-primary-300/20",
      "block",
      "data-[state=checked]:translate-x-full",
      "data-[state=unchecked]:translate-x-0",
      "h-7",
      "origin-top-left",
      "pointer-events-none",
      "rounded-full",
      "shadow-bevel",
      "transition-transform",
      "w-7",
    ],
  },
});
