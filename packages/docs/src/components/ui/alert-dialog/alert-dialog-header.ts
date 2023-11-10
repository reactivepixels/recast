"use client";

import { AlertDialogHeaderPrimitive } from "@rpxl/recast-primitives/alert-dialog";

export const AlertDialogHeader = AlertDialogHeaderPrimitive.recast(
  "AlertDialogHeader",
  {
    base: {
      root: "flex flex-col space-y-2 text-center sm:text-left",
    },
  }
);
