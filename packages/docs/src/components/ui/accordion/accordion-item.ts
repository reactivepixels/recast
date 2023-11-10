"use client";

import { AccordionItemPrimitive } from "@rpxl/recast-primitives";

export const AccordionItem = AccordionItemPrimitive.recast("AccordionItem", {
  base: {
    root: "border-b",
  },
});
