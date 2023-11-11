import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

const DEFAULT_THEME_KEY = "alertDescription";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.HTMLAttributes<HTMLDivElement> & RecastThemeProps;

const AlertDescriptionPrimitive = forwardRef<HTMLDivElement, Props>(
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
      <div ref={ref} className={cn(classes?.root, className)} {...props} />
    );
  },
);

AlertDescriptionPrimitive.displayName = "AlertDescriptionPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AlertDescriptionPrimitive,
  DEFAULT_THEME_KEY,
);
