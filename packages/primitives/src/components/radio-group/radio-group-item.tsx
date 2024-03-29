import * as RadixRadioGroupPrimitive from "@radix-ui/react-radio-group";

import React, { forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root" | "indicator" | "icon">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixRadioGroupPrimitive.Item
> &
  RecastThemeProps & {
    icon: React.ComponentType;
  };

const Component = forwardRef<
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
    const classes = getRecastClasses<BaseTheme>({
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

Component.displayName = "RadioGroupItemPrimitive";

export const RadioGroupItemPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
