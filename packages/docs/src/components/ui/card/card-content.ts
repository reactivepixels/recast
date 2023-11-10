"use client";

import { CardContentPrimitive } from "@rpxl/recast-primitives/card";

export const CardContent = CardContentPrimitive.recast("CardContent", {
  base: {
    root: "p-6 pt-0",
  },
});
