import * as RadixRadioGroupPrimitive from "@radix-ui/react-radio-group";

import React, { forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixRadioGroupPrimitive.Root
> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixRadioGroupPrimitive.Root>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = getRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixRadioGroupPrimitive.Root
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

Component.displayName = "RadioGroupPrimitive";

export const RadioGroupPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
