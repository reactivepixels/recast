import React, { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root">;

export type Props = HTMLAttributes<HTMLParagraphElement> & RecastThemeProps;

const CardDescriptionPrimitive = forwardRef<HTMLParagraphElement, Props>(
  ({ themekey, className, size, variant, modifier, ...props }, ref) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
    });

    return <p className={cn(classes?.root, className)} ref={ref} {...props} />;
  },
);

CardDescriptionPrimitive.displayName = "CardDescriptionPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  CardDescriptionPrimitive,
);
