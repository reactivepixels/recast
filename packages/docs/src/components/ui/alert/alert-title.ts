"use client";

import { RecastAlertTitlePrimitive } from "@rpxl/recast-primitives";

export const AlertTitle = RecastAlertTitlePrimitive.recast("AlertTitle", {
  base: {
    root: "mb-1 font-medium leading-none tracking-tight",
  },
});
