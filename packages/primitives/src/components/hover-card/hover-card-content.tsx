import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixHoverCardPrimitive from "@radix-ui/react-hover-card";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

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
    const classes = useRecastClasses<BaseTheme>({
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
