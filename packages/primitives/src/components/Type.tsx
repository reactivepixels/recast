import React, { ElementType, forwardRef } from "react";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";
import clsx from "clsx";
import { RecastThemeProp } from "@rpxl/recast/core";

const DEFAULT_THEME_KEY = "type";
type BaseTheme = RecastThemeProp<"root">;

type Props = React.HTMLAttributes<HTMLElement> &
  RecastThemeProps & {
    /** Typography html element override. */
    as?: ElementType;
  };

const TypePrimitive = forwardRef<HTMLElement, Props>(
  (
    {
      as: Tag = "p",
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
      <Tag className={clsx(classes?.root, className)} ref={ref} {...props}>
        {children}
      </Tag>
    );
  },
);

if (process.env["NODE_ENV"] !== "production")
  TypePrimitive.displayName = "TypePrimitive";

export default createRecastComponent<Props, BaseTheme>(
  TypePrimitive,
  DEFAULT_THEME_KEY,
);
