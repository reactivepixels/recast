"use client";

import { RecastAlertDialogFooterPrimitive } from "@rpxl/recast-primitives";

export const AlertDialogFooter = RecastAlertDialogFooterPrimitive.recast(
  "AlertDialogFooter",
  {
    base: {
      root: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    },
  }
);
