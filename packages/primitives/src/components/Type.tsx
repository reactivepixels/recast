import React, { ElementType, forwardRef } from "react";
import clsx from "clsx";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

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
      themekey,
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

export default createRecastComponent<Props, BaseTheme>(TypePrimitive);
