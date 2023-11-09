"use client";

import { AvatarImagePrimitive } from "@rpxl/recast-primitives";

export const AvatarImage = AvatarImagePrimitive.recast("AvatarImage", {
  base: {
    root: "aspect-square h-full w-full",
  },
});
