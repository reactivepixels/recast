import * as RadixPopoverPrimitive from "@radix-ui/react-popover";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixPopoverPrimitive.Content
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixPopoverPrimitive.Content>,
  Props
>(({ ...props }, ref) => {
  return (
    <RadixPopoverPrimitive.Portal>
      <RadixPopoverPrimitive.Content ref={ref} {...props} />
    </RadixPopoverPrimitive.Portal>
  );
});

Component.displayName = "PopoverContentPrimitive";

export const PopoverContentPrimitive = Component;
