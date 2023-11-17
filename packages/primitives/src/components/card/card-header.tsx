import React, { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

export type Props = HTMLAttributes<HTMLDivElement> & RecastThemeProps;

const CardHeaderPrimitive = forwardRef<HTMLDivElement, Props>(
  ({ themekey, className, variants, modifiers, ...props }, ref) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <header className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

CardHeaderPrimitive.displayName = "CardHeaderPrimitive";

export default createRecastComponent<Props, BaseTheme>(CardHeaderPrimitive);
