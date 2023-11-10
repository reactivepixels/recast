"use client";

import { AvatarImagePrimitive } from "@rpxl/recast-primitives/avatar";

export const AvatarImage = AvatarImagePrimitive.recast("AvatarImage", {
  base: {
    root: "aspect-square h-full w-full",
  },
});
