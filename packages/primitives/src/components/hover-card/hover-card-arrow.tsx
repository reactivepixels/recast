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
  typeof RadixHoverCardPrimitive.Arrow
> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixHoverCardPrimitive.Arrow>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixHoverCardPrimitive.Arrow
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

Component.displayName = "HoverCardArrowPrimitive";

export const HoverCardArrowPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
