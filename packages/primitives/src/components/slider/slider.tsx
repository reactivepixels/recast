import { cn } from "../../utils/cn.js";
import * as RadixSliderPrimitive from "@radix-ui/react-slider";
import { RecastWithClassNameProps } from "@rpxl/recast";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<typeof RadixSliderPrimitive.Root> &
  RecastWithClassNameProps<{
    root: string;
    track: string;
    range: string;
    thumb: string;
  }>;

const Component = forwardRef<
  React.ElementRef<typeof RadixSliderPrimitive.Root>,
  Props
>(({ className, rcx, ...props }, ref) => {
  return (
    <RadixSliderPrimitive.Root
      ref={ref}
      className={cn(rcx?.root, className)}
      {...props}
    >
      <RadixSliderPrimitive.Track className={rcx?.track}>
        <RadixSliderPrimitive.Range className={rcx?.range} />
      </RadixSliderPrimitive.Track>
      <RadixSliderPrimitive.Thumb className={rcx?.thumb} />
    </RadixSliderPrimitive.Root>
  );
});

Component.displayName = "SliderPrimitive";

export const SliderPrimitive = Component;
