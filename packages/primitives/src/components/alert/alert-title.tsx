import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "alertTitle";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.HTMLAttributes<HTMLHeadingElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const AlertTitlePrimitive = forwardRef<HTMLHeadingElement, Props>(
  (
    {
      themekey = DEFAULT_THEME_KEY,
      className,
      size,
      variant,
      modifier,
      asChild,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "h5";

    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
    });

    return (
      <Comp ref={ref} className={cn(classes?.root, className)} {...props} />
    );
  },
);

AlertTitlePrimitive.displayName = "AlertPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AlertTitlePrimitive,
  DEFAULT_THEME_KEY,
);
