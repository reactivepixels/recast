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
  typeof RadixHoverCardPrimitive.Trigger
> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixHoverCardPrimitive.Trigger>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = getRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixHoverCardPrimitive.Trigger
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

Component.displayName = "HoverCardTriggerPrimitive";

export const HoverCardTriggerPrimitive = createRecastComponent<
  Props,
  BaseTheme
>(Component);
