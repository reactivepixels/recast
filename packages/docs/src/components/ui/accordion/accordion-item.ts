"use client";

import { RecastAccordionItemPrimitive } from "@rpxl/recast-primitives";

export const AccordionItem = RecastAccordionItemPrimitive.recast(
  "AccordionItem",
  {
    base: {
      root: "border-b",
    },
  }
);
