"use client";

import { RecastAccordionContentPrimitive } from "@rpxl/recast-primitives";

export const AccordionContent = RecastAccordionContentPrimitive.recast(
  "AccordionContent",
  {
    base: {
      root: [
        "overflow-hidden",
        "text-sm",
        "data-[state=closed]:animate-accordion-up",
        "data-[state=open]:animate-accordion-down",
      ],
      content: "pb-4 pt-0",
    },
  }
);
