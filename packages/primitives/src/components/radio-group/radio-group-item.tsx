import { cn } from "../../utils/cn.js";
import { CheckIcon } from "@radix-ui/react-icons";
import * as RadixRadioGroupPrimitive from "@radix-ui/react-radio-group";
import { RecastWithClassNameProps } from "@rpxl/recast";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixRadioGroupPrimitive.Item
> & {
  icon: React.ComponentType;
} & RecastWithClassNameProps<{
    root: string;
    indicator: string;
    icon: string;
  }>;

const Component = forwardRef<
  React.ElementRef<typeof RadixRadioGroupPrimitive.Item>,
  Props
>(({ className, icon: Icon = CheckIcon, cls, ...props }, ref) => {
  return (
    <RadixRadioGroupPrimitive.Item
      className={cn(cls?.root, className)}
      ref={ref}
      {...props}
    >
      <RadixRadioGroupPrimitive.Indicator className={cls?.indicator}>
        <Icon className={cls?.icon} />
      </RadixRadioGroupPrimitive.Indicator>
    </RadixRadioGroupPrimitive.Item>
  );
});

Component.displayName = "RadioGroupItemPrimitive";

export const RadioGroupItemPrimitive = Component;
