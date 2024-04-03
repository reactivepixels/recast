import * as RadixToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixToggleGroupPrimitive.Item
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixToggleGroupPrimitive.Item>,
  Props
>(({ ...props }, ref) => {
  return <RadixToggleGroupPrimitive.Item ref={ref} {...props} />;
});

Component.displayName = "ToggleGroupItemPrimitive";

export const ToggleGroupItemPrimitive = Component;
