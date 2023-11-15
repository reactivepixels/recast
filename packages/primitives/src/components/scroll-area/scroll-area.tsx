import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root"> &
  RecastThemeProp<"viewport"> &
  RecastThemeProp<"thumb"> &
  RecastThemeProp<"corner"> &
  RecastThemeProp<"scrollbar">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixScrollAreaPrimitive.Root
> &
  RecastThemeProps &
  Pick<
    React.ComponentPropsWithoutRef<
      typeof RadixScrollAreaPrimitive.ScrollAreaScrollbar
    >,
    "orientation"
  >;

const ScrollAreaPrimitive = forwardRef<
  React.ElementRef<typeof RadixScrollAreaPrimitive.Root>,
  Props
>(
  (
    {
      themekey,
      className,
      size,
      variant,
      modifier,
      children,
      orientation = "vertical",
      ...props
    },
    ref,
  ) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
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

ScrollAreaPrimitive.displayName = "ScrollAreaPrimitive";

export default createRecastComponent<Props, BaseTheme>(ScrollAreaPrimitive);
