import React, { ElementType, forwardRef } from "react";
import clsx from "clsx";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.SVGAttributes<SVGSVGElement> &
  RecastThemeProps & {
    /** Typography html element override. */
    as?: ElementType;
  };

const Component = forwardRef<SVGSVGElement, Props>(
  ({ themekey, children, className, variants, modifiers, ...props }, ref) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <svg className={clsx(classes?.root, className)} ref={ref} {...props}>
        {children}
      </svg>
    );
  },
);

Component.displayName = "IconPrimitive";

export const IconPrimitive = createRecastComponent<Props, BaseTheme>(Component);
