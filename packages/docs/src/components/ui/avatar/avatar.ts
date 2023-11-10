"use client";

import { AvatarPrimitive } from "@rpxl/recast-primitives/avatar";

export const Avatar = AvatarPrimitive.recast("Avatar", {
  defaults: { size: "md" },
  base: {
    root: "relative flex shrink-0 overflow-hidden rounded-full",
  },
  size: {
    sm: {
      root: "h-10 w-10 ",
    },
    md: {
      root: "h-14 w-14",
    },
    lg: {
      root: "h-20 w-20",
    },
  },
});
