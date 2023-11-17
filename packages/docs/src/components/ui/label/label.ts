"use client";

import { LabelPrimitive } from "@rpxl/recast-primitives";

export const Label = LabelPrimitive.recast({
  base: {
    root: [
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    ],
  },
});
