import * as RadixRadioGroupPrimitive from "@radix-ui/react-radio-group";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixRadioGroupPrimitive.Root
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixRadioGroupPrimitive.Root>,
  Props
>(({ ...props }, ref) => {
  return <RadixRadioGroupPrimitive.Root ref={ref} {...props} />;
});

Component.displayName = "RadioGroupPrimitive";

export const RadioGroupPrimitive = Component;
