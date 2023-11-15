import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixCheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root" | "indicator" | "icon">;

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
      themekey,
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

export default createRecastComponent<Props, BaseTheme>(CheckboxPrimitive);
