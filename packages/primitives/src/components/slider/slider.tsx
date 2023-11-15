import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixSliderPrimitive from "@radix-ui/react-slider";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root"> &
  RecastThemeProp<"track"> &
  RecastThemeProp<"range"> &
  RecastThemeProp<"thumb">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixSliderPrimitive.Root
> &
  RecastThemeProps;

const SliderPrimitive = forwardRef<
  React.ElementRef<typeof RadixSliderPrimitive.Root>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    size,
    variant,
    modifier,
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

SliderPrimitive.displayName = "SliderPrimitive";

export default createRecastComponent<Props, BaseTheme>(SliderPrimitive);
