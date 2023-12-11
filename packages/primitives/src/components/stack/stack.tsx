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

const Component = forwardRef<HTMLHeadingElement, Props>(
  (
    { themekey, children, className, variants, modifiers, asChild, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <Comp className={cn(classes?.root, className)} ref={ref} {...props}>
        {children}
      </Comp>
    );
  },
);

Component.displayName = "StackPrimitive";

export const StackPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
