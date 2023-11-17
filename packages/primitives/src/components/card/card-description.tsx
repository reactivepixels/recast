import React, { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

export type Props = HTMLAttributes<HTMLParagraphElement> & RecastThemeProps;

const CardDescriptionPrimitive = forwardRef<HTMLParagraphElement, Props>(
  ({ themekey, className, variants, modifiers, ...props }, ref) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return <p className={cn(classes?.root, className)} ref={ref} {...props} />;
  },
);

CardDescriptionPrimitive.displayName = "CardDescriptionPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  CardDescriptionPrimitive,
);
