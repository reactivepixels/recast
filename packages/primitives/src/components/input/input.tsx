import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.InputHTMLAttributes<HTMLInputElement> &
  RecastThemeProps;

const InputPrimitive = forwardRef<HTMLInputElement, Props>(
  ({ themekey, className, size, variant, modifier, ...props }, ref) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
    });

    return (
      <input className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

InputPrimitive.displayName = "InputPrimitive";

export default createRecastComponent<Props, BaseTheme>(InputPrimitive);
