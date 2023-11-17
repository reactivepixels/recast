"use client";

import { AlertDialogHeaderPrimitive } from "@rpxl/recast-primitives";

export const AlertDialogHeader = AlertDialogHeaderPrimitive.recast({
  base: {
    root: "flex flex-col space-y-2 text-center sm:text-left",
  },
});
