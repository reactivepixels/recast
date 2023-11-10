import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";
import { RecastThemeProp } from "@rpxl/recast/core";
import { cn } from "../../utils/cn";

const DEFAULT_THEME_KEY = "sectionWrapper";
type BaseTheme = RecastThemeProp<"root"> & RecastThemeProp<"inner">;

type Props = React.HTMLAttributes<HTMLElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const SectionWrapperPrimitive = forwardRef<HTMLElement, Props>(
  (
    {
      themekey = DEFAULT_THEME_KEY,
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
    const Comp = asChild ? Slot : "section";
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
    });

    return (
      <Comp className={cn(classes?.root, className)} ref={ref} {...props}>
        <div className={classes?.inner}>{children}</div>
      </Comp>
    );
  },
);

SectionWrapperPrimitive.displayName = "SectionWrapperPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  SectionWrapperPrimitive,
  DEFAULT_THEME_KEY,
);
