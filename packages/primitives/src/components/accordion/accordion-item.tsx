import * as RadixAccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAccordionPrimitive.Item
>;

const Component = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Item>,
  Props
>(({ ...props }, ref) => {
  return <RadixAccordionPrimitive.Item ref={ref} {...props} />;
});

Component.displayName = "AccordionItemPrimitive";

export const AccordionItemPrimitive = Component;
