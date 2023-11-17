import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import { CheckIcon } from "@radix-ui/react-icons";
import * as RadixRadioGroupPrimitive from "@radix-ui/react-radio-group";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root" | "indicator" | "icon">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixRadioGroupPrimitive.Item
> &
  RecastThemeProps & {
    icon: React.ComponentType;
  };

const RadioGroupItemPrimitive = forwardRef<
  React.ElementRef<typeof RadixRadioGroupPrimitive.Item>,
  Props
>(
  (
    {
      themekey,
      className,
      variants,
      modifiers,
      icon: Icon = CheckIcon,
      ...props
    },
    ref,
  ) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <RadixRadioGroupPrimitive.Item
        className={cn(classes?.root, className)}
        ref={ref}
        {...props}
      >
        <RadixRadioGroupPrimitive.Indicator
          className={cn(classes?.indicator, className)}
        >
          <Icon className={cn(classes?.icon, className)} />
        </RadixRadioGroupPrimitive.Indicator>
      </RadixRadioGroupPrimitive.Item>
    );
  },
);

RadioGroupItemPrimitive.displayName = "RadioGroupItemPrimitive";

export default createRecastComponent<Props, BaseTheme>(RadioGroupItemPrimitive);
