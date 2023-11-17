import React, { forwardRef } from "react";
import * as RadixLabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixLabelPrimitive.Root
> &
  RecastThemeProps;

const LabelPrimitive = forwardRef<
  React.ElementRef<typeof RadixLabelPrimitive.Root>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
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
