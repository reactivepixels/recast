import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root" | "inner">;

type Props = React.HTMLAttributes<HTMLElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const Component = forwardRef<HTMLElement, Props>(
  (
    { themekey, children, className, variants, modifiers, asChild, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "section";
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <Comp className={cn(classes?.root, className)} ref={ref} {...props}>
        <div className={classes?.inner}>{children}</div>
      </Comp>
    );
  },
);

Component.displayName = "SectionWrapperPrimitive";

export const SectionWrapperPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
