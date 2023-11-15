"use client";

import { SkeletonPrimitive } from "@rpxl/recast-primitives";

export const Skeleton = SkeletonPrimitive.recast({
  base: {
    root: "animate-pulse rounded-md bg-primary/10",
  },
});
