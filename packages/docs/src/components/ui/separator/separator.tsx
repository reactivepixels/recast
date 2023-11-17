"use client";

import { SeparatorPrimitive } from "@rpxl/recast-primitives";
import { forwardRef } from "react";

const BaseSeparator = SeparatorPrimitive.recast({
  // This matches the default for the primitives built in `orientation` prop
  defaults: { variant: "horizontal" },
  base: {
    root: "shrink-0 bg-border",
  },
  variant: {
    vertical: {
      root: "h-full w-[1px]",
    },
    horizontal: {
      root: "h-[1px] w-full",
    },
  },
});

// Remove the variant prop from the consumer as it will be conditionally
// applied based on the components built in `orientation` prop
type Props = Omit<
  React.ComponentPropsWithoutRef<typeof BaseSeparator>,
  "variant"
>;

export const Separator = forwardRef<
  React.ElementRef<typeof BaseSeparator>,
  Props
>(({ ...props }, ref) => {
  // Here we use the components built in `orientation`
  // prop to configure the variant styles
  return <BaseSeparator ref={ref} variant={props.orientation} {...props} />;
});

Separator.displayName = "Separator";
