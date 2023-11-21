"use client";

import { SectionWrapperPrimitive } from "@rpxl/recast-primitives";

export const SectionWrapper = SectionWrapperPrimitive.recast({
  base: {
    root: "flex justify-center w-full",
    inner: "w-full max-w-2xl px-4 relative",
  },
});
