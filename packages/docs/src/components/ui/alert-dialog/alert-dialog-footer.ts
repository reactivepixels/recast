"use client";

import { AlertDialogFooterPrimitive } from "@rpxl/recast-primitives/alert-dialog";

export const AlertDialogFooter = AlertDialogFooterPrimitive.recast(
  "AlertDialogFooter",
  {
    base: {
      root: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    },
  }
);
