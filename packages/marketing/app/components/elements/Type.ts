import { RecastTypePrimitive } from "@rpxl/recast-primitives";

export const Type = RecastTypePrimitive.recast("Type", {
  defaults: {
    size: "md",
    variant: "light",
  },
  base: {
    root: "font-mono",
  },
  size: {
    sm: {
      root: "text-sm",
    },
    md: {
      root: "text-base",
    },
    lg: {
      root: "text-lg",
    },
  },
  variant: {
    light: {
      root: "text-dark",
    },
    dark: {
      root: "text-white",
    },
    primary: {
      root: "text-primary",
    },
    secondary: {
      root: "text-secondary",
    },
    inherit: {
      root: "text-inherit",
    },
  },
  modifier: {
    bold: {
      root: "font-bold",
    },
    center: { root: "text-center" },
  },
});
