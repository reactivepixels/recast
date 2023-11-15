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

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixHoverCardPrimitive.Arrow
> &
  RecastThemeProps;

const HoverCardArrowPrimitive = forwardRef<
  React.ElementRef<typeof RadixHoverCardPrimitive.Arrow>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    size,
    variant,
    modifier,
  });

  return (
    <RadixHoverCardPrimitive.Arrow
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

HoverCardArrowPrimitive.displayName = "HoverCardArrowPrimitive";

export default createRecastComponent<Props, BaseTheme>(HoverCardArrowPrimitive);
