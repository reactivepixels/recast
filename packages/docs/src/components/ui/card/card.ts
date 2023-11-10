"use client";

import { CardPrimitive } from "@rpxl/recast-primitives";

export const Card = CardPrimitive.recast("Card", {
  base: {
    root: "rounded-xl border bg-card text-card-foreground shadow",
  },
});
