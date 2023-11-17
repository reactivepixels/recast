"use client";

import { ScrollAreaPrimitive } from "@rpxl/recast-primitives";
import { forwardRef } from "react";

const BaseScrollArea = ScrollAreaPrimitive.recast({
  // This matches the default for the primitives built in `orientation` prop
  defaults: { variants: { variant: "vertical" } },
  base: {
    root: "relative overflow-hidden",
    viewport: "h-full w-full rounded-[inherit]",
    thumb: "relative flex-1 rounded-full bg-border",
    scrollbar: "flex touch-none select-none transition-colors",
  },
  variants: {
    variant: {
      vertical: {
        scrollbar: "h-full w-2.5 border-l border-l-transparent p-[1px]",
      },
      horizontal: {
        scrollbar: "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      },
    },
  },
});

// Remove the variant prop from the consumer as it will be conditionally
// applied based on the components built in `orientation` prop
type Props = Omit<
  React.ComponentPropsWithoutRef<typeof BaseScrollArea>,
  "variant"
>;

export const ScrollArea = forwardRef<
  React.ElementRef<typeof BaseScrollArea>,
  Props
>(({ ...props }, ref) => {
  // Here we use the components built in `orientation`
  // prop to configure the variant styles
  return <BaseScrollArea ref={ref} variant={props.orientation} {...props} />;
});

ScrollArea.displayName = "ScrollArea";
