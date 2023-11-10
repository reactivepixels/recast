import React, { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "cardDescription";

type BaseTheme = RecastThemeProp<"root">;

export type Props = HTMLAttributes<HTMLParagraphElement> & RecastThemeProps;

const CardDescriptionPrimitive = forwardRef<HTMLParagraphElement, Props>(
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

    return <p className={cn(classes?.root, className)} ref={ref} {...props} />;
  },
);

CardDescriptionPrimitive.displayName = "CardDescriptionPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  CardDescriptionPrimitive,
  DEFAULT_THEME_KEY,
);
