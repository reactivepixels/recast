"use client";

import { AccordionItemPrimitive } from "@rpxl/recast-primitives/accordion";

export const AccordionItem = AccordionItemPrimitive.recast("AccordionItem", {
  base: {
    root: "border-b",
  },
});
