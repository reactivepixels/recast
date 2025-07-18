import { StackPrimitive } from "@rpxl/recast-primitives";
import { recast } from "@rpxl/recast";

const stackStyles = recast.styles({
  defaults: { variants: { size: "md" } },
  base: "flex flex-col",
  variants: {
    size: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-2",
      lg: "gap-8",
      xl: "gap-16",
      xxl: "gap-24",
    },
  },
});

export const Stack = stackStyles(StackPrimitive);
