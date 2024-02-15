import React, { forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.HTMLAttributes<HTMLHeadingElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const Component = forwardRef<HTMLHeadingElement, Props>(
  ({ themekey, className, variants, modifiers, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "h5";

    const classes = getRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <Comp ref={ref} className={cn(classes?.root, className)} {...props} />
    );
  },
);

Component.displayName = "AlertTitlePrimitive";

export const AlertTitlePrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
