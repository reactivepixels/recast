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
>(({ className, cls, ...props }, ref) => {
  return (
    <RadixSliderPrimitive.Root
      ref={ref}
      className={cn(cls?.root, className)}
      {...props}
    >
      <RadixSliderPrimitive.Track className={cls?.track}>
        <RadixSliderPrimitive.Range className={cls?.range} />
      </RadixSliderPrimitive.Track>
      <RadixSliderPrimitive.Thumb className={cls?.thumb} />
    </RadixSliderPrimitive.Root>
  );
});

Component.displayName = "SliderPrimitive";

export const SliderPrimitive = Component;
