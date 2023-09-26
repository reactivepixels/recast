import { RecastIconPrimitive } from "@rpxl/recast-primitives";

export const Icon = RecastIconPrimitive.recast("Icon", {
  defaults: { size: "md" },
  base: {
    root: "text-inherit",
  },
  size: {
    sm: {
      root: "w-3 h-3",
    },
    md: {
      root: "w-4 h-4",
    },
    lg: {
      root: "w-5 h-5",
    },
    inherit: {},
  },
});
