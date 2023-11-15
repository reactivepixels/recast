import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.HTMLAttributes<HTMLHeadingElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const StackPrimitive = forwardRef<HTMLHeadingElement, Props>(
  (
    {
      themekey,
      children,
      className,
      size,
      variant,
      modifier,
      asChild,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
    });

    return (
      <Comp className={cn(classes?.root, className)} ref={ref} {...props}>
        {children}
      </Comp>
    );
  },
);

StackPrimitive.displayName = "StackPrimitive";

export default createRecastComponent<Props, BaseTheme>(StackPrimitive);
