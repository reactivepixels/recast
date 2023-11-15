import React, { forwardRef } from "react";
import clsx from "clsx";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";
import Link from "next/link";

type BaseTheme = RecastBaseTheme<"root" | "startEl" | "endEl">;

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
      themekey,
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

export default createRecastComponent<Props, BaseTheme>(LinkPrimitive);
