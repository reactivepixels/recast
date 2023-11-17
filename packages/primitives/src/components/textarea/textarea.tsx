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
  ({ themekey, className, variants, modifiers, ...props }, ref) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <textarea className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

TextareaPrimitive.displayName = "TextareaPrimitive";

export default createRecastComponent<Props, BaseTheme>(TextareaPrimitive);
