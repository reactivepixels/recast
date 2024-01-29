"use client";

import { CardContentPrimitive } from "@rpxl/recast-primitives";

export const CardContent = CardContentPrimitive.recast({
  base: {
    root: ["py-12", "px-8"],
  },
});
