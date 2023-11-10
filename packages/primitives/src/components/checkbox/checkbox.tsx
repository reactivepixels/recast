import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";
import * as RadixCheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "card";

type BaseTheme = RecastThemeProp<"root"> &
  RecastThemeProp<"indicator"> &
  RecastThemeProp<"icon">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixCheckboxPrimitive.Root
> &
  RecastThemeProps & {
    icon: React.ComponentType;
  };

const CheckboxPrimitive = forwardRef<
  React.ElementRef<typeof RadixCheckboxPrimitive.Root>,
  Props
>(
  (
    {
      themekey = DEFAULT_THEME_KEY,
      className,
      size,
      variant,
      modifier,
      icon: Icon = CheckIcon,
      ...props
    },
    ref,
  ) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
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

CheckboxPrimitive.displayName = "CheckboxPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  CheckboxPrimitive,
  DEFAULT_THEME_KEY,
);
