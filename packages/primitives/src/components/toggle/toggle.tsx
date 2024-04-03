import { cn } from "../../utils/cn.js";
import * as RadixTogglePrimitive from "@radix-ui/react-toggle";
import { RecastWithClassNameProps } from "@rpxl/recast";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<typeof RadixTogglePrimitive.Root> &
  RecastWithClassNameProps<{
    root: string;
    thumb: string;
  }>;

const Component = forwardRef<
  React.ElementRef<typeof RadixTogglePrimitive.Root>,
  Props
>(({ rcx, className, ...props }, ref) => {
  return (
    <RadixTogglePrimitive.Root
      ref={ref}
      className={cn(rcx?.root, className)}
      {...props}
    />
  );
});

Component.displayName = "TogglePrimitive";

export const TogglePrimitive = Component;
