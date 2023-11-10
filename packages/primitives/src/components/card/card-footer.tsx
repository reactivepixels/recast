import React, { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "cardFooter";

type BaseTheme = RecastThemeProp<"root">;

export type Props = HTMLAttributes<HTMLDivElement> & RecastThemeProps;

const CardFooterPrimitive = forwardRef<HTMLDivElement, Props>(
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
      <footer className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

CardFooterPrimitive.displayName = "CardFooterPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  CardFooterPrimitive,
  DEFAULT_THEME_KEY,
);
