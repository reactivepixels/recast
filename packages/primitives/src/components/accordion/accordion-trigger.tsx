import { cn } from "../../utils/cn.js";
import * as RadixAccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { RecastClsProps } from "@rpxl/recast";
import * as React from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAccordionPrimitive.Trigger
> & {
  icon: React.ComponentType;
} & RecastClsProps<"root" | "trigger" | "icon">;

const Component = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Trigger>,
  Props
>(
  (
    { className, children, icon: Icon = ChevronDownIcon, cls, ...props },
    ref,
  ) => {
    return (
      <RadixAccordionPrimitive.Header className={cn(cls?.root, className)}>
        <RadixAccordionPrimitive.Trigger
          ref={ref}
          className={cls?.trigger}
          {...props}
        >
          {children}
          <Icon className={cls?.icon} />
        </RadixAccordionPrimitive.Trigger>
      </RadixAccordionPrimitive.Header>
    );
  },
);

Component.displayName = "AccordionTriggerPrimitive";

export const AccordionTriggerPrimitive = Component;
