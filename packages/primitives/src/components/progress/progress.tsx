import React, { forwardRef } from "react";
import * as RadixProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root" | "indicator">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixProgressPrimitive.Root
> &
  RecastThemeProps;

const ProgressPrimitive = forwardRef<
  React.ElementRef<typeof RadixProgressPrimitive.Root>,
  Props
>(({ themekey, className, variants, modifiers, value, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixProgressPrimitive.Root
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    >
      <RadixProgressPrimitive.Indicator
        className={cn(classes?.indicator, className)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </RadixProgressPrimitive.Root>
  );
});

ProgressPrimitive.displayName = "ProgressPrimitive";

export default createRecastComponent<Props, BaseTheme>(ProgressPrimitive);
