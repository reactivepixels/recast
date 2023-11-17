"use client";

import { AvatarImagePrimitive } from "@rpxl/recast-primitives";

export const AvatarImage = AvatarImagePrimitive.recast({
  base: {
    root: "aspect-square h-full w-full",
  },
});
