import React, { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

type Props = HTMLAttributes<HTMLParagraphElement> & RecastThemeProps;

const Component = forwardRef<HTMLParagraphElement, Props>(
  ({ themekey, className, variants, modifiers, ...props }, ref) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return <p className={cn(classes?.root, className)} ref={ref} {...props} />;
  },
);

Component.displayName = "CardDescriptionPrimitive";

export const CardDescriptionPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
