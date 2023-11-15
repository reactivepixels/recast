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
  typeof RadixHoverCardPrimitive.Trigger
> &
  RecastThemeProps;

const HoverCardTriggerPrimitive = forwardRef<
  React.ElementRef<typeof RadixHoverCardPrimitive.Trigger>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    size,
    variant,
    modifier,
  });

  return (
    <RadixHoverCardPrimitive.Trigger
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

HoverCardTriggerPrimitive.displayName = "HoverCardTriggerPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  HoverCardTriggerPrimitive,
);
