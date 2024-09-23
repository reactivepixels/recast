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
>(({ className, cls, children, orientation = "vertical", ...props }, ref) => {
  return (
    <RadixScrollAreaPrimitive.Root
      ref={ref}
      className={cn(cls?.root, className)}
      {...props}
    >
      <RadixScrollAreaPrimitive.Viewport className={cls?.viewport}>
        {children}
      </RadixScrollAreaPrimitive.Viewport>
      <RadixScrollAreaPrimitive.ScrollAreaScrollbar
        orientation={orientation}
        className={cls?.scrollbar}
      >
        <RadixScrollAreaPrimitive.ScrollAreaThumb className={cls?.thumb} />
      </RadixScrollAreaPrimitive.ScrollAreaScrollbar>
      <RadixScrollAreaPrimitive.Corner className={cls?.corner} />
    </RadixScrollAreaPrimitive.Root>
  );
});

Component.displayName = "ScrollAreaPrimitive";

export const ScrollAreaPrimitive = Component;
