"use client";

import { AlertDialogCancelPrimitive } from "@rpxl/recast-primitives/alert-dialog";

export const AlertDialogCancel = AlertDialogCancelPrimitive.recast(
  "AlertDialogCancel",
  {
    base: {
      root: "mt-2 sm:mt-0",
    },
  }
);
