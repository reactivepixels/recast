"use client";

import { AlertDialogTitlePrimitive } from "@rpxl/recast-primitives/alert-dialog";

export const AlertDialogTitle = AlertDialogTitlePrimitive.recast(
  "AlertDialogTitle",
  {
    base: {
      root: "text-lg font-semibold",
    },
  }
);
