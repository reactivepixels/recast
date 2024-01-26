import { StackPrimitive } from "@rpxl/recast-primitives";

export const Stack = StackPrimitive.recast({
  defaults: { variants: { size: "md" } },
  base: {
    root: "flex flex-col",
  },
  variants: {
    size: {
      none: {
        root: "gap-0",
      },
      xs: {
        root: "gap-1",
      },
      sm: {
        root: "gap-2",
      },
      md: {
        root: "gap-4",
      },
      lg: {
        root: "gap-8",
      },
      xl: {
        root: "gap-16",
      },
      xxl: {
        root: "gap-24",
      },
    },
  },
});
