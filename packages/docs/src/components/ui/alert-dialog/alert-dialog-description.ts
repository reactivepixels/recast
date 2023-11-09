"use client";

import { RecastAlertDialogDescriptionPrimitive } from "@rpxl/recast-primitives";

export const AlertDialogDescription =
  RecastAlertDialogDescriptionPrimitive.recast("AlertDialogDescription", {
    base: {
      root: "text-sm text-muted-foreground",
    },
  });
