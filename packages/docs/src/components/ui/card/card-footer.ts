"use client";

import { CardFooterPrimitive } from "@rpxl/recast-primitives/card";

export const CardFooter = CardFooterPrimitive.recast("CardFooter", {
  base: {
    root: "flex items-center p-6 pt-0",
  },
});
