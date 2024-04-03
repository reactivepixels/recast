import * as RadixToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixToggleGroupPrimitive.Root
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixToggleGroupPrimitive.Root>,
  Props
>(({ ...props }, ref) => {
  return <RadixToggleGroupPrimitive.Root ref={ref} {...props} />;
});

Component.displayName = "ToggleGroupPrimitive";

export const ToggleGroupPrimitive = Component;
