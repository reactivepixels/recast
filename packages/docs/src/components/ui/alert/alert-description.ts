"use client";

import { AlertDescriptionPrimitive } from "@rpxl/recast-primitives/alert";

export const AlertDescription = AlertDescriptionPrimitive.recast(
  "AlertDescription",
  {
    base: {
      root: "text-sm [&_p]:leading-relaxed",
    },
  }
);
