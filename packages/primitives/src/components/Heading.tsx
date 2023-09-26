import React, { ElementType, forwardRef } from "react";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";
import clsx from "clsx";
import { RecastThemeProp } from "@rpxl/recast/core";

const DEFAULT_THEME_KEY = "heading";
type BaseTheme = RecastThemeProp<"root">;

type Props = React.HTMLAttributes<HTMLHeadingElement> &
  RecastThemeProps & {
    /** Heading level override. */
    as?: ElementType<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >
    >;
  };

const HeadingPrimitive = forwardRef<HTMLHeadingElement, Props>(
  (
    {
      as: Tag = "h1",
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
  HeadingPrimitive.displayName = "HeadingPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  HeadingPrimitive,
  DEFAULT_THEME_KEY,
);
