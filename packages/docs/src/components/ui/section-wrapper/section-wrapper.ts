"use client";

import { SectionWrapperPrimitive } from "@rpxl/recast-primitives";
import { recast } from "@rpxl/recast";

export const SectionWrapper = recast(SectionWrapperPrimitive, {
  base: {
    root: "flex w-full justify-center",
    inner: "relative w-full max-w-2xl px-4",
  },
});
