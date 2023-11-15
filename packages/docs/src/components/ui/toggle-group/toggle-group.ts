"use client";

import { ToggleGroupPrimitive } from "@rpxl/recast-primitives";

export const ToggleGroup = ToggleGroupPrimitive.recast({
  base: {
    root: "flex items-center justify-center gap-1",
  },
});
