import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixHoverCardPrimitive from "@radix-ui/react-hover-card";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixHoverCardPrimitive.Content
> &
  RecastThemeProps;

const HoverCardContentPrimitive = forwardRef<
  React.ElementRef<typeof RadixHoverCardPrimitive.Content>,
  Props
>(
  (
    {
      themekey,
      className,
      size,
      variant,
      modifier,
      align = "center",
      sideOffset = 4,
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
      <RadixHoverCardPrimitive.Content
        className={cn(classes?.root, className)}
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        {...props}
      />
    );
  },
);

HoverCardContentPrimitive.displayName = "HoverCardContentPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  HoverCardContentPrimitive,
);
