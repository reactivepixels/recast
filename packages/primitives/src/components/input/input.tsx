import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.InputHTMLAttributes<HTMLInputElement> & RecastThemeProps;

const Component = forwardRef<HTMLInputElement, Props>(
  ({ themekey, className, variants, modifiers, ...props }, ref) => {
    const classes = useRecastClasses<BaseTheme>({
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
