"use client";

import { CardPrimitive } from "@rpxl/recast-primitives";

export const Card = CardPrimitive.recast({
  base: {
    root: [
      "rounded-2xl",
      "bg-clip-content",
      "bg-gradient-[0deg] from-primary-500/50 via-primary-500/50 to-primary-500/5",
      "shadow-inner-glow",
      "after:absolute after:inset-0 after:border after:border-solid after:border-primary-100/10 after:rounded-inherit after:pointer-events-none",
    ],
  },
});
