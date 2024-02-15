import * as RadixScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import React, { forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<
  "root" | "viewport" | "thumb" | "corner" | "scrollbar"
>;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixScrollAreaPrimitive.Root
> &
  RecastThemeProps &
  Pick<
    React.ComponentPropsWithoutRef<
      typeof RadixScrollAreaPrimitive.ScrollAreaScrollbar
    >,
    "orientation"
  >;

const Component = forwardRef<
  React.ElementRef<typeof RadixScrollAreaPrimitive.Root>,
  Props
>(
  (
    {
      themekey,
      className,
      variants,
      modifiers,
      children,
      orientation = "vertical",
      ...props
    },
    ref,
  ) => {
    const classes = getRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <RadixScrollAreaPrimitive.Root
        ref={ref}
        className={cn(classes?.root, className)}
        {...props}
      >
        <RadixScrollAreaPrimitive.Viewport className={classes?.viewport}>
          {children}
        </RadixScrollAreaPrimitive.Viewport>
        <RadixScrollAreaPrimitive.ScrollAreaScrollbar
          orientation={orientation}
          className={classes?.scrollbar}
        >
          <RadixScrollAreaPrimitive.ScrollAreaThumb
            className={classes?.thumb}
          />
        </RadixScrollAreaPrimitive.ScrollAreaScrollbar>
        <RadixScrollAreaPrimitive.Corner className={classes?.corner} />
      </RadixScrollAreaPrimitive.Root>
    );
  },
);

Component.displayName = "ScrollAreaPrimitive";

export const ScrollAreaPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
