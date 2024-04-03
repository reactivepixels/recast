import * as RadixCollapsiblePrimitive from "@radix-ui/react-collapsible";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixCollapsiblePrimitive.Root
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixCollapsiblePrimitive.Root>,
  Props
>(({ ...props }, ref) => {
  return <RadixCollapsiblePrimitive.Root ref={ref} {...props} />;
});

Component.displayName = "CollapsiblePrimitive";

export const CollapsiblePrimitive = Component;
