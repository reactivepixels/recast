import React, { ElementType, forwardRef } from "react";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";
import clsx from "clsx";
import { RecastThemeProp } from "@rpxl/recast/core";

const DEFAULT_THEME_KEY = "stack";
type BaseTheme = RecastThemeProp<"root">;

type Props = React.HTMLAttributes<HTMLHeadingElement> &
  RecastThemeProps & {
    /** HTML element override. */
    as?: ElementType;
  };

const StackPrimitive = forwardRef<HTMLHeadingElement, Props>(
  (
    {
      as: Tag = "div",
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
  StackPrimitive.displayName = "StackPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  StackPrimitive,
  DEFAULT_THEME_KEY,
);
