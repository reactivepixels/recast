import React, { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "card";

type BaseTheme = RecastThemeProp<"root">;

export type Props = HTMLAttributes<HTMLDivElement> & RecastThemeProps;

const CardPrimitive = forwardRef<HTMLDivElement, Props>(
  (
    {
      themekey = DEFAULT_THEME_KEY,
      className,
      size,
      variant,
      modifier,
      ...props
    },
    ref,
  ) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
    });

    return (
      <div className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

CardPrimitive.displayName = "CardPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  CardPrimitive,
  DEFAULT_THEME_KEY,
);
