import React, { HTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "badge";

type BaseTheme = RecastThemeProp<"root">;

export type Props = HTMLAttributes<HTMLDivElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const BadgePrimitive = forwardRef<HTMLDivElement, Props>(
  (
    {
      themekey = DEFAULT_THEME_KEY,
      className,
      size,
      variant,
      modifier,
      asChild,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";

    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
    });

    return (
      <Comp className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

BadgePrimitive.displayName = "BadgePrimitive";

export default createRecastComponent<Props, BaseTheme>(
  BadgePrimitive,
  DEFAULT_THEME_KEY,
);
