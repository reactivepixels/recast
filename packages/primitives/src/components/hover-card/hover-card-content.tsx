import * as RadixHoverCardPrimitive from "@radix-ui/react-hover-card";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixHoverCardPrimitive.Content
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixHoverCardPrimitive.Content>,
  Props
>(({ ...props }, ref) => {
  return <RadixHoverCardPrimitive.Content ref={ref} {...props} />;
});

Component.displayName = "HoverCardContentPrimitive";

export const HoverCardContentPrimitive = Component;
