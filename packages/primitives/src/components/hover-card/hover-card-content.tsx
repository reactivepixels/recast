import * as RadixHoverCardPrimitive from "@radix-ui/react-hover-card";

import React, { forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixHoverCardPrimitive.Content
> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixHoverCardPrimitive.Content>,
  Props
>(
  (
    {
      themekey,
      className,
      variants,
      modifiers,
      align = "center",
      sideOffset = 4,
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

Component.displayName = "HoverCardContentPrimitive";

export const HoverCardContentPrimitive = createRecastComponent<
  Props,
  BaseTheme
>(Component);
