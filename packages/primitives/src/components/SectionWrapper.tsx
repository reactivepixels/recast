import React, { ElementType, forwardRef } from "react";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";
import clsx from "clsx";
import { RecastThemeProp } from "@rpxl/recast/core";

const DEFAULT_THEME_KEY = "sectionWrapper";
type BaseTheme = RecastThemeProp<"root"> & RecastThemeProp<"inner">;

type Props = React.HTMLAttributes<HTMLElement> &
  RecastThemeProps & {
    /** HTML element override */
    as?: ElementType;
  };

const SectionWrapperPrimitive = forwardRef<HTMLElement, Props>(
  (
    {
      as: Tag = "section",
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
        <div className={classes?.inner}>{children}</div>
      </Tag>
    );
  },
);

if (process.env["NODE_ENV"] !== "production")
  SectionWrapperPrimitive.displayName = "SectionWrapperPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  SectionWrapperPrimitive,
  DEFAULT_THEME_KEY,
);
