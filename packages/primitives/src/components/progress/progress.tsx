import * as RadixProgressPrimitive from "@radix-ui/react-progress";

import React, { forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root" | "indicator">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixProgressPrimitive.Root
> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixProgressPrimitive.Root>,
  Props
>(({ themekey, className, variants, modifiers, value, ...props }, ref) => {
  const classes = getRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixProgressPrimitive.Root
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    >
      <RadixProgressPrimitive.Indicator
        className={cn(classes?.indicator, className)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </RadixProgressPrimitive.Root>
  );
});

Component.displayName = "ProgressPrimitive";

export const ProgressPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
