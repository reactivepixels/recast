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
