import React, { ElementType, forwardRef } from "react";
import clsx from "clsx";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root">;

type Props = React.SVGAttributes<SVGSVGElement> &
  RecastThemeProps & {
    /** Typography html element override. */
    as?: ElementType;
  };

const IconPrimitive = forwardRef<SVGSVGElement, Props>(
  (
    { themekey, children, className, size, variant, modifier, ...props },
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

export default createRecastComponent<Props, BaseTheme>(IconPrimitive);
