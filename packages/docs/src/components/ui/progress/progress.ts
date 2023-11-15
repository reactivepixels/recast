"use client";

import { ProgressPrimitive } from "@rpxl/recast-primitives";

export const Progress = ProgressPrimitive.recast({
  base: {
    root: "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
    indicator: "h-full w-full flex-1 bg-primary transition-all",
  },
});
