import * as RadixCheckboxPrimitive from "@radix-ui/react-checkbox";

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
  typeof RadixCheckboxPrimitive.Root
> &
  RecastThemeProps & {
    icon: React.ComponentType;
  };

const Component = forwardRef<
  React.ElementRef<typeof RadixCheckboxPrimitive.Root>,
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
      <RadixCheckboxPrimitive.Root
        className={cn(classes?.root, className)}
        ref={ref}
        {...props}
      >
        <RadixCheckboxPrimitive.Indicator
          className={cn(classes?.indicator, className)}
        >
          <Icon className={cn(classes?.icon, className)} />
        </RadixCheckboxPrimitive.Indicator>
      </RadixCheckboxPrimitive.Root>
    );
  },
);

Component.displayName = "CheckboxPrimitive";

export const CheckboxPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
