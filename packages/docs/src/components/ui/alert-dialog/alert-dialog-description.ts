"use client";

import { AlertDialogDescriptionPrimitive } from "@rpxl/recast-primitives";

export const AlertDialogDescription = AlertDialogDescriptionPrimitive.recast(
  "AlertDialogDescription",
  {
    base: {
      root: "text-sm text-muted-foreground",
    },
  }
);
