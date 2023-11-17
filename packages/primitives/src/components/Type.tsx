import React, { ElementType, forwardRef } from "react";
import clsx from "clsx";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.HTMLAttributes<HTMLElement> &
  RecastThemeProps & {
    /** Typography html element override. */
    as?: ElementType;
  };

const TypePrimitive = forwardRef<HTMLElement, Props>(
  (
    {
      as: Tag = "p",
      themekey,
      children,
      className,
      variants,
      modifiers,
      ...props
    },
    ref,
  ) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
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

export default createRecastComponent<Props, BaseTheme>(TypePrimitive);
