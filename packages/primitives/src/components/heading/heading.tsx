import React, { ElementType, forwardRef } from "react";
import clsx from "clsx";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

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
  HeadingPrimitive.displayName = "HeadingPrimitive";

export default createRecastComponent<Props, BaseTheme>(HeadingPrimitive);
