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

const CardPrimitive = forwardRef<HTMLDivElement, Props>(
  ({ themekey, className, size, variant, modifier, ...props }, ref) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
    });

    return (
      <div className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

CardPrimitive.displayName = "CardPrimitive";

export default createRecastComponent<Props, BaseTheme>(CardPrimitive);
