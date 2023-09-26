import React, { ElementType, forwardRef } from "react";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";
import clsx from "clsx";
import { RecastThemeProp } from "@rpxl/recast/core";

const DEFAULT_THEME_KEY = "icon";
type BaseTheme = RecastThemeProp<"root">;

type Props = React.SVGAttributes<SVGSVGElement> &
  RecastThemeProps & {
    /** Typography html element override. */
    as?: ElementType;
  };

const IconPrimitive = forwardRef<SVGSVGElement, Props>(
  (
    {
      themekey = DEFAULT_THEME_KEY,
      children,
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
      <svg className={clsx(classes?.root, className)} ref={ref} {...props}>
        {children}
      </svg>
    );
  },
);

if (process.env["NODE_ENV"] !== "production")
  IconPrimitive.displayName = "IconPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  IconPrimitive,
  DEFAULT_THEME_KEY,
);
