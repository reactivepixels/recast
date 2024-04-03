import * as RadixHoverCardPrimitive from "@radix-ui/react-hover-card";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixHoverCardPrimitive.Arrow
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixHoverCardPrimitive.Arrow>,
  Props
>(({ ...props }, ref) => {
  return <RadixHoverCardPrimitive.Arrow ref={ref} {...props} />;
});

Component.displayName = "HoverCardArrowPrimitive";

export const HoverCardArrowPrimitive = Component;
