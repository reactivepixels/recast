import React, { forwardRef } from "react";
import clsx from "clsx";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";
import { RecastThemeProp } from "@rpxl/recast/core";
import Link from "next/link";

const DEFAULT_THEME_KEY = "link";
type BaseTheme = RecastThemeProp<"root"> &
  RecastThemeProp<"startEl"> &
  RecastThemeProp<"endEl">;

type Props = RecastThemeProps &
  React.ComponentPropsWithRef<typeof Link> & {
    /**
     * Element placed before the label.
     */
    startEl?: React.ReactNode;
    /**
     * Element placed after the label.
     */
    endEl?: React.ReactNode;
  };

const LinkPrimitive = forwardRef<React.ComponentRef<typeof Link>, Props>(
  (
    {
      themekey = DEFAULT_THEME_KEY,
      startEl,
      endEl,
      size,
      variant,
      modifier,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
    });

    return (
      <Link className={clsx(classes?.root, className)} ref={ref} {...props}>
        {startEl && <div className={classes?.startEl}>{startEl}</div>}
        {children}
        {endEl && <div className={classes?.endEl}>{endEl}</div>}
      </Link>
    );
  }
);

if (process.env["NODE_ENV"] !== "production")
  LinkPrimitive.displayName = "LinkPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  LinkPrimitive,
  DEFAULT_THEME_KEY
);
