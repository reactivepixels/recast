import { cn } from "../../utils/cn.js";
import * as RadixProgressPrimitive from "@radix-ui/react-progress";
import { RecastClsProps } from "@rpxl/recast";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixProgressPrimitive.Root
> &
  RecastClsProps<"root" | "indicator">;

const Component = forwardRef<
  React.ElementRef<typeof RadixProgressPrimitive.Root>,
  Props
>(({ className, cls, value, ...props }, ref) => {
  return (
    <RadixProgressPrimitive.Root
      className={cn(cls?.root, className)}
      ref={ref}
      {...props}
    >
      <RadixProgressPrimitive.Indicator
        className={cls?.indicator}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </RadixProgressPrimitive.Root>
  );
});

Component.displayName = "ProgressPrimitive";

export const ProgressPrimitive = Component;
