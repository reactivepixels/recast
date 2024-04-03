import { cn } from "../../utils/cn.js";
import * as RadixSwitchPrimitive from "@radix-ui/react-switch";
import { RecastWithClassNameProps } from "@rpxl/recast";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<typeof RadixSwitchPrimitive.Root> &
  RecastWithClassNameProps<{
    root: string;
    thumb: string;
  }>;

const Component = forwardRef<
  React.ElementRef<typeof RadixSwitchPrimitive.Root>,
  Props
>(({ className, rcx, ...props }, ref) => {
  return (
    <RadixSwitchPrimitive.Root
      ref={ref}
      className={cn(rcx?.root, className)}
      {...props}
    >
      <RadixSwitchPrimitive.Thumb className={rcx?.thumb} />
    </RadixSwitchPrimitive.Root>
  );
});

Component.displayName = "SwitchPrimitive";

export const SwitchPrimitive = Component;
