import * as RadixLabelPrimitive from "@radix-ui/react-label";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<typeof RadixLabelPrimitive.Root>;

const Component = forwardRef<
  React.ElementRef<typeof RadixLabelPrimitive.Root>,
  Props
>(({ ...props }, ref) => {
  return <RadixLabelPrimitive.Root ref={ref} {...props} />;
});

Component.displayName = "LabelPrimitive";

export const LabelPrimitive = Component;
