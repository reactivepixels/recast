"use client";

import { recast } from "@rpxl/recast";
import { CardContentPrimitive } from "@rpxl/recast-primitives";

export const CardContent = recast(CardContentPrimitive, {
  base: ["py-12", "px-8"],
});
