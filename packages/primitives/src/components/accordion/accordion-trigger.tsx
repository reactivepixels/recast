import { cn } from "../../utils/cn.js";
import * as RadixAccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { RecastWithClassNameProps } from "@rpxl/recast";
import * as React from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAccordionPrimitive.Trigger
> & {
  icon: React.ComponentType;
} & RecastWithClassNameProps<{
    root: string;
    trigger: string;
    icon: string;
  }>;

const Component = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Trigger>,
  Props
>(
  (
    { className, children, icon: Icon = ChevronDownIcon, rcx, ...props },
    ref,
  ) => {
    return (
      <RadixAccordionPrimitive.Header className={cn(rcx?.root, className)}>
        <RadixAccordionPrimitive.Trigger
          ref={ref}
          className={rcx?.trigger}
          {...props}
        >
          {children}
          <Icon className={rcx?.icon} />
        </RadixAccordionPrimitive.Trigger>
      </RadixAccordionPrimitive.Header>
    );
  },
);

Component.displayName = "AccordionTriggerPrimitive";

export const AccordionTriggerPrimitive = Component;
