"use client";

import { AlertDescriptionPrimitive } from "@rpxl/recast-primitives";

export const AlertDescription = AlertDescriptionPrimitive.recast({
  base: {
    root: "text-sm [&_p]:leading-relaxed",
  },
});
