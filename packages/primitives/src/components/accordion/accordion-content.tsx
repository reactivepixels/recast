import { cn } from "../../utils/cn.js";
import * as RadixAccordionPrimitive from "@radix-ui/react-accordion";
import { RecastClsProps } from "@rpxl/recast";
import * as React from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAccordionPrimitive.Content
> &
  RecastClsProps<"root" | "content">;

const Component = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Content>,
  Props
>(({ className, cls, children, ...props }, ref) => {
  return (
    <RadixAccordionPrimitive.Content
      ref={ref}
      className={cn(cls?.root, className)}
      {...props}
    >
      <div className={cls?.content}>{children}</div>
    </RadixAccordionPrimitive.Content>
  );
});

Component.displayName = "AccordionContentPrimitive";

export const AccordionContentPrimitive = Component;
