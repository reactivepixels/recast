import * as RadixPopoverPrimitive from "@radix-ui/react-popover";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixPopoverPrimitive.Trigger
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixPopoverPrimitive.Trigger>,
  Props
>(({ ...props }, ref) => {
  return <RadixPopoverPrimitive.Trigger ref={ref} {...props} />;
});

Component.displayName = "PopoverTriggerPrimitive";

export const PopoverTriggerPrimitive = Component;
