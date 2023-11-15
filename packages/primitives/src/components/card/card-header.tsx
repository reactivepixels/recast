import React, { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root">;

export type Props = HTMLAttributes<HTMLDivElement> & RecastThemeProps;

const CardHeaderPrimitive = forwardRef<HTMLDivElement, Props>(
  ({ themekey, className, size, variant, modifier, ...props }, ref) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
    });

    return (
      <header className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

CardHeaderPrimitive.displayName = "CardHeaderPrimitive";

export default createRecastComponent<Props, BaseTheme>(CardHeaderPrimitive);
