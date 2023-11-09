import React, { forwardRef } from "react";
import { cn } from "@/utils";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "alert";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.HTMLAttributes<HTMLDivElement> & RecastThemeProps;

const AlertPrimitive = forwardRef<HTMLDivElement, Props>(
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

AlertPrimitive.displayName = "AlertPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AlertPrimitive,
  DEFAULT_THEME_KEY,
);
