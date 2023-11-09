"use client";

import { RecastAlertDescriptionPrimitive } from "@rpxl/recast-primitives";

export const AlertDescription = RecastAlertDescriptionPrimitive.recast(
  "AlertDescription",
  {
    base: {
      root: "text-sm [&_p]:leading-relaxed",
    },
  }
);
