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

const Component = forwardRef<HTMLElement, Props>(
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

Component.displayName = "TypePrimitive";

export const TypePrimitive = createRecastComponent<Props, BaseTheme>(Component);
