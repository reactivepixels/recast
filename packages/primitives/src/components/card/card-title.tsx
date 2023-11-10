import React, { HTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "cardTitle";

type BaseTheme = RecastThemeProp<"root">;

export type Props = HTMLAttributes<HTMLHeadingElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const CardTitlePrimitive = forwardRef<HTMLHeadingElement, Props>(
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
    const Comp = asChild ? Slot : "h3";

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

CardTitlePrimitive.displayName = "CardTitlePrimitive";

export default createRecastComponent<Props, BaseTheme>(
  CardTitlePrimitive,
  DEFAULT_THEME_KEY,
);
