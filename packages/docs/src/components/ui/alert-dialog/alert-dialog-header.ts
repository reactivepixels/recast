"use client";

import { RecastAlertDialogHeaderPrimitive } from "@rpxl/recast-primitives";

export const AlertDialogHeader = RecastAlertDialogHeaderPrimitive.recast(
  "AlertDialogHeader",
  {
    base: {
      root: "flex flex-col space-y-2 text-center sm:text-left",
    },
  }
);
