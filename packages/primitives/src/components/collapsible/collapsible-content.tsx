import * as RadixCollapsiblePrimitive from "@radix-ui/react-collapsible";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixCollapsiblePrimitive.CollapsibleContent
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixCollapsiblePrimitive.CollapsibleContent>,
  Props
>(({ ...props }, ref) => {
  return <RadixCollapsiblePrimitive.CollapsibleContent ref={ref} {...props} />;
});

Component.displayName = "CollapsibleContentPrimitive";

export const CollapsibleContentPrimitive = Component;
