"use client";

import { CardDescriptionPrimitive } from "@rpxl/recast-primitives/card";

export const CardDescription = CardDescriptionPrimitive.recast(
  "CardDescription",
  {
    base: {
      root: "text-sm text-muted-foreground",
    },
  }
);
