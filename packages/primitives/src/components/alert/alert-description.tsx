import React, { forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.HTMLAttributes<HTMLDivElement> & RecastThemeProps;

const Component = forwardRef<HTMLDivElement, Props>(
  ({ themekey, className, variants, modifiers, ...props }, ref) => {
    const classes = getRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <div ref={ref} className={cn(classes?.root, className)} {...props} />
    );
  },
);

Component.displayName = "AlertDescriptionPrimitive";

export const AlertDescriptionPrimitive = createRecastComponent<
  Props,
  BaseTheme
>(Component);
