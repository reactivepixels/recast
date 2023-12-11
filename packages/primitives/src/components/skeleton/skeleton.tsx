import React, { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

type Props = HTMLAttributes<HTMLDivElement> & RecastThemeProps;

const Component = forwardRef<HTMLDivElement, Props>(
  ({ themekey, className, variants, modifiers, ...props }, ref) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <div className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

Component.displayName = "SkeletonPrimitive";

export const SkeletonPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
