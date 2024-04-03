import * as RadixSeparatorPrimitive from "@radix-ui/react-separator";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixSeparatorPrimitive.Root
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixSeparatorPrimitive.Root>,
  Props
>(({ ...props }, ref) => {
  return <RadixSeparatorPrimitive.Root ref={ref} {...props} />;
});

Component.displayName = "SeparatorPrimitive";

export const SeparatorPrimitive = Component;
