import { RecastHeadingPrimitive } from "@rpxl/recast-primitives";

export const Heading = RecastHeadingPrimitive.recast("Heading", {
  defaults: {
    variant: "gradient",
    size: "xl",
  },
  base: {
    root: "font-sans",
  },
  size: {
    sm: {
      root: "text-2xl", // 24px
    },
    md: {
      root: "text-3xl", // 30px
    },
    lg: {
      root: "text-4xl", // 36px
    },
    xl: {
      root: "text-5xl", // 48px
    },
  },
  variant: {
    light: {
      root: "text-dark",
    },
    dark: {
      root: "text-white",
    },
    gradient: {
      root: "text-transparent bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-gradient-primary-end bg-clip-text",
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
    center: {
      root: "text-center",
    },
  },
});
