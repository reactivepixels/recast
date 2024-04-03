import { cn } from "../../utils/cn.js";
import * as RadixAccordionPrimitive from "@radix-ui/react-accordion";
import { RecastWithClassNameProps } from "@rpxl/recast";
import * as React from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAccordionPrimitive.Content
> &
  RecastWithClassNameProps<{
    root: string;
    content: string;
  }>;

const Component = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Content>,
  Props
>(({ className, rcx, children, ...props }, ref) => {
  return (
    <RadixAccordionPrimitive.Content
      ref={ref}
      className={cn(rcx?.root, className)}
      {...props}
    >
      <div className={cn(rcx?.content, className)}>{children}</div>
    </RadixAccordionPrimitive.Content>
  );
});

Component.displayName = "AccordionContentPrimitive";

export const AccordionContentPrimitive = Component;
