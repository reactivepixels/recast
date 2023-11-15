"use client";

import { AvatarFallbackPrimitive } from "@rpxl/recast-primitives";

export const AvatarFallback = AvatarFallbackPrimitive.recast({
  base: {
    root: "flex h-full w-full items-center justify-center rounded-full bg-muted",
  },
});