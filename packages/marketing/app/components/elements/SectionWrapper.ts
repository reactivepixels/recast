import { RecastSectionWrapperPrimitive } from "@rpxl/recast-primitives";

export const SectionWrapper = RecastSectionWrapperPrimitive.recast(
  "SectionWrapper",
  {
    base: {
      root: "flex justify-center",
      inner: "w-full max-w-lg px-4 relative",
    },
  }
);