"use client";

import { CardPrimitive } from "@rpxl/recast-primitives";

export const Card = CardPrimitive.recast({
  base: {
    root: "rounded-xl border border-border bg-card text-card-foreground shadow",
  },
});
