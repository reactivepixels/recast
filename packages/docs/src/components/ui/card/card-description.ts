"use client";

import { CardDescriptionPrimitive } from "@rpxl/recast-primitives";

export const CardDescription = CardDescriptionPrimitive.recast({
  base: {
    root: "text-sm text-muted-foreground",
  },
});
