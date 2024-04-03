import { cn } from "../../utils/cn.js";
import * as RadixCheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { RecastWithClassNameProps } from "@rpxl/recast";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixCheckboxPrimitive.Root
> & {
  icon: React.ComponentType;
} & RecastWithClassNameProps<{
    root?: string;
    indicator?: string;
    icon?: string;
  }>;

const Component = forwardRef<
  React.ElementRef<typeof RadixCheckboxPrimitive.Root>,
  Props
>(({ className, rcx, icon: Icon = CheckIcon, ...props }, ref) => {
  return (
    <RadixCheckboxPrimitive.Root
      className={cn(rcx?.root, className)}
      ref={ref}
      {...props}
    >
      <RadixCheckboxPrimitive.Indicator className={rcx?.indicator}>
        <Icon className={rcx?.indicator} />
      </RadixCheckboxPrimitive.Indicator>
    </RadixCheckboxPrimitive.Root>
  );
});

Component.displayName = "CheckboxPrimitive";

export const CheckboxPrimitive = Component;
