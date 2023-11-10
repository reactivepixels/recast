"use client";

import { AlertDialogCancelPrimitive } from "@rpxl/recast-primitives";

export const AlertDialogCancel = AlertDialogCancelPrimitive.recast(
  "AlertDialogCancel",
  {
    base: {
      root: "mt-2 sm:mt-0",
    },
  }
);
