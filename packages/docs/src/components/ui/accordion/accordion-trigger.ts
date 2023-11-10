"use client";

import { AccordionTriggerPrimitive } from "@rpxl/recast-primitives";

export const AccordionTrigger = AccordionTriggerPrimitive.recast(
  "AccordionTrigger",
  {
    base: {
      root: "flex",
      trigger: [
        "flex",
        "flex-1",
        "items-center",
        "justify-between",
        "py-4",
        "text-sm",
        "font-medium",
        "transition-all",
        "hover:underline",
        "[&[data-state=open]>svg]:rotate-180",
      ],
      icon: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
    },
  }
);
