import React, { forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.InputHTMLAttributes<HTMLInputElement> & RecastThemeProps;

const Component = forwardRef<HTMLInputElement, Props>(
  ({ themekey, className, variants, modifiers, ...props }, ref) => {
    const classes = getRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <input className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

Component.displayName = "InputPrimitive";

export const InputPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
