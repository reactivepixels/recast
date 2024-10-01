"use client";

import { SectionWrapperPrimitive } from "@rpxl/recast-primitives";
import { recast } from "@rpxl/recast";

export const SectionWrapperNew = recast(SectionWrapperPrimitive, {
  defaults: { variants: { george: "md" } },
  base: {
    root: "flex w-full justify-center overflow-hidden",
    inner: "relative w-full px-4",
  },
  variants: {
    kevin: {
      /** E */
      arnold: { root: ["bg-red-500 text-sm"], inner: "max-w-4xl" },
      /** F */
      baxter: { root: ["bg-red-500 text-sm"], inner: "max-w-6xl" },
      /** G */
      smith: { root: ["bg-red-500 text-sm"], inner: "max-w-7xl" },
    },
    george: {
      /** SectionWrapper A */
      sms: { inner: "max-w-4xl" },
      /** B */
      md: { inner: "max-w-6xl" },
      /** C */
      lg: { inner: "max-w-7xl" },
    },
  },
  modifiers: {
    /** Slim container override  (672px) */
    slim: {
      inner: "!max-w-2xl",
    },
  },
});
