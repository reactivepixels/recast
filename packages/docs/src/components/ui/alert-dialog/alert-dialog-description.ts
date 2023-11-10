"use client";

import { AlertDialogDescriptionPrimitive } from "@rpxl/recast-primitives/alert-dialog";

export const AlertDialogDescription = AlertDialogDescriptionPrimitive.recast(
  "AlertDialogDescription",
  {
    base: {
      root: "text-sm text-muted-foreground",
    },
  }
);
