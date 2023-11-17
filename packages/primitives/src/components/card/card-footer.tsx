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

const CardFooterPrimitive = forwardRef<HTMLDivElement, Props>(
  ({ themekey, className, variants, modifiers, ...props }, ref) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <footer className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

CardFooterPrimitive.displayName = "CardFooterPrimitive";

export default createRecastComponent<Props, BaseTheme>(CardFooterPrimitive);
