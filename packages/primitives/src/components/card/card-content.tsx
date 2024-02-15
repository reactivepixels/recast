import React, { HTMLAttributes, forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root">;

type Props = HTMLAttributes<HTMLDivElement> & RecastThemeProps;

const Component = forwardRef<HTMLDivElement, Props>(
  ({ themekey, className, variants, modifiers, ...props }, ref) => {
    const classes = getRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <div className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

Component.displayName = "CardContentPrimitive";

export const CardContentPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
