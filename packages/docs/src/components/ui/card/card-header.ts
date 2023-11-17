"use client";

import { CardHeaderPrimitive } from "@rpxl/recast-primitives";

export const CardHeader = CardHeaderPrimitive.recast({
  base: {
    root: "flex flex-col space-y-1.5 p-6",
  },
});
