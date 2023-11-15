import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import { CheckIcon } from "@radix-ui/react-icons";
import * as RadixRadioGroupPrimitive from "@radix-ui/react-radio-group";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root"> &
  RecastThemeProp<"indicator"> &
  RecastThemeProp<"icon">;

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
