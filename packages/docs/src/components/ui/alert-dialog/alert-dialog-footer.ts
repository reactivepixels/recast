"use client";

import { AlertDialogFooterPrimitive } from "@rpxl/recast-primitives";

export const AlertDialogFooter = AlertDialogFooterPrimitive.recast({
  base: {
    root: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
  },
});
