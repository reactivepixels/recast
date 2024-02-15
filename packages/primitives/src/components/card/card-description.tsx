import React, { HTMLAttributes, forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root">;

type Props = HTMLAttributes<HTMLParagraphElement> & RecastThemeProps;

const Component = forwardRef<HTMLParagraphElement, Props>(
  ({ themekey, className, variants, modifiers, ...props }, ref) => {
    const classes = getRecastClasses<BaseTheme>({
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
