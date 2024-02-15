import * as RadixSliderPrimitive from "@radix-ui/react-slider";

import React, { forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root" | "track" | "range" | "thumb">;

type Props = React.ComponentPropsWithoutRef<typeof RadixSliderPrimitive.Root> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixSliderPrimitive.Root>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = getRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixSliderPrimitive.Root
      ref={ref}
      className={cn(classes?.root, className)}
      {...props}
    >
      <RadixSliderPrimitive.Track className={cn(classes?.track, className)}>
        <RadixSliderPrimitive.Range className={classes?.range} />
      </RadixSliderPrimitive.Track>
      <RadixSliderPrimitive.Thumb className={classes?.thumb} />
    </RadixSliderPrimitive.Root>
  );
});

Component.displayName = "SliderPrimitive";

export const SliderPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
