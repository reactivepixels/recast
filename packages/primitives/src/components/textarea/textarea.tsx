import React, { TextareaHTMLAttributes, forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root">;

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & RecastThemeProps;

const Component = forwardRef<HTMLTextAreaElement, Props>(
  ({ themekey, className, variants, modifiers, ...props }, ref) => {
    const classes = getRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <textarea className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

Component.displayName = "TextareaPrimitive";

export const TextareaPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
