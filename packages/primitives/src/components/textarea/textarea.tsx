import React, { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & RecastThemeProps;

const TextareaPrimitive = forwardRef<HTMLTextAreaElement, Props>(
  ({ themekey, className, size, variant, modifier, ...props }, ref) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
    });

    return (
      <textarea className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

TextareaPrimitive.displayName = "TextareaPrimitive";

export default createRecastComponent<Props, BaseTheme>(TextareaPrimitive);
