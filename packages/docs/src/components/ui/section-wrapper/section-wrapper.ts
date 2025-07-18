"use client";

import { SectionWrapperPrimitive } from "@rpxl/recast-primitives";
import { recast } from "@rpxl/recast";

const sectionWrapperStyles = recast.styles({
  base: {
    root: "flex w-full justify-center",
    inner: "relative w-full max-w-2xl px-4",
  },
});

export const SectionWrapper = sectionWrapperStyles(SectionWrapperPrimitive);
