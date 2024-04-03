import * as RadixAccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAccordionPrimitive.Root
>;

const Component = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Root>,
  Props
>(({ ...props }, ref) => {
  return <RadixAccordionPrimitive.Root ref={ref} {...props} />;
});

Component.displayName = "AccordionPrimitive";

export const AccordionPrimitive = Component;
