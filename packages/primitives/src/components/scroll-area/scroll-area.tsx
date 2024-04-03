import { cn } from "../../utils/cn.js";
import * as RadixScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { RecastWithClassNameProps } from "@rpxl/recast";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixScrollAreaPrimitive.Root
> &
  Pick<
    React.ComponentPropsWithoutRef<
      typeof RadixScrollAreaPrimitive.ScrollAreaScrollbar
    >,
    "orientation"
  > &
  RecastWithClassNameProps<{
    root: string;
    viewport: string;
    thumb: string;
    corner: string;
    scrollbar: string;
  }>;

const Component = forwardRef<
  React.ElementRef<typeof RadixScrollAreaPrimitive.Root>,
  Props
>(({ className, rcx, children, orientation = "vertical", ...props }, ref) => {
  return (
    <RadixScrollAreaPrimitive.Root
      ref={ref}
      className={cn(rcx?.root, className)}
      {...props}
    >
      <RadixScrollAreaPrimitive.Viewport className={rcx?.viewport}>
        {children}
      </RadixScrollAreaPrimitive.Viewport>
      <RadixScrollAreaPrimitive.ScrollAreaScrollbar
        orientation={orientation}
        className={rcx?.scrollbar}
      >
        <RadixScrollAreaPrimitive.ScrollAreaThumb className={rcx?.thumb} />
      </RadixScrollAreaPrimitive.ScrollAreaScrollbar>
      <RadixScrollAreaPrimitive.Corner className={rcx?.corner} />
    </RadixScrollAreaPrimitive.Root>
  );
});

Component.displayName = "ScrollAreaPrimitive";

export const ScrollAreaPrimitive = Component;
