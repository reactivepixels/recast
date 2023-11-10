"use client";

import { AlertTitlePrimitive } from "@rpxl/recast-primitives/alert";

export const AlertTitle = AlertTitlePrimitive.recast("AlertTitle", {
  base: {
    root: "mb-1 font-medium leading-none tracking-tight",
  },
});
