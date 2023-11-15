import React, { forwardRef } from "react";
import * as RadixLabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../utils/cn.js";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixLabelPrimitive.Root
> &
  RecastThemeProps;

const LabelPrimitive = forwardRef<
  React.ElementRef<typeof RadixLabelPrimitive.Root>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    size,
    variant,
    modifier,
  });

  return (
    <RadixLabelPrimitive.Root
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

LabelPrimitive.displayName = "LabelPrimitive";

export default createRecastComponent<Props, BaseTheme>(LabelPrimitive);
