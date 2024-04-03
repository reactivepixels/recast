import * as RadixHoverCardPrimitive from "@radix-ui/react-hover-card";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixHoverCardPrimitive.Trigger
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixHoverCardPrimitive.Trigger>,
  Props
>(({ ...props }, ref) => {
  return <RadixHoverCardPrimitive.Trigger ref={ref} {...props} />;
});

Component.displayName = "HoverCardTriggerPrimitive";

export const HoverCardTriggerPrimitive = Component;
