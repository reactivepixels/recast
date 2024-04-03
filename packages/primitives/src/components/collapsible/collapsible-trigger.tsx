import * as RadixCollapsiblePrimitive from "@radix-ui/react-collapsible";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixCollapsiblePrimitive.CollapsibleTrigger
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixCollapsiblePrimitive.CollapsibleTrigger>,
  Props
>(({ ...props }, ref) => {
  return <RadixCollapsiblePrimitive.CollapsibleTrigger ref={ref} {...props} />;
});

Component.displayName = "CollapsibleTriggerPrimitive";

export const CollapsibleTriggerPrimitive = Component;
