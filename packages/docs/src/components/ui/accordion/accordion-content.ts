"use client";

import { AccordionContentPrimitive } from "@rpxl/recast-primitives";

export const AccordionContent = AccordionContentPrimitive.recast(
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
