import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

export type Props = React.InputHTMLAttributes<HTMLInputElement> &
  RecastThemeProps;

const InputPrimitive = forwardRef<HTMLInputElement, Props>(
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

InputPrimitive.displayName = "InputPrimitive";

export default createRecastComponent<Props, BaseTheme>(InputPrimitive);
