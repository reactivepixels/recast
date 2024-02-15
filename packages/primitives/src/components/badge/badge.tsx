import React, { HTMLAttributes, forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root">;

type Props = HTMLAttributes<HTMLDivElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const Component = forwardRef<HTMLDivElement, Props>(
  ({ themekey, className, variants, modifiers, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    const classes = getRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <Comp className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

Component.displayName = "BadgePrimitive";

export const BadgePrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
