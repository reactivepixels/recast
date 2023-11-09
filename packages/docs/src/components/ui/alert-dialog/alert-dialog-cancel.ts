"use client";

import { RecastAlertDialogCancelPrimitive } from "@rpxl/recast-primitives";

export const AlertDialogCancel = RecastAlertDialogCancelPrimitive.recast(
  "AlertDialogCancel",
  {
    base: {
      root: "mt-2 sm:mt-0",
    },
  }
);
