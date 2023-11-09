"use client";

import { RecastAlertDialogTitlePrimitive } from "@rpxl/recast-primitives";

export const AlertDialogTitle = RecastAlertDialogTitlePrimitive.recast(
  "AlertDialogTitle",
  {
    base: {
      root: "text-lg font-semibold",
    },
  }
);
