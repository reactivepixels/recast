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

type Props = React.HTMLAttributes<HTMLParagraphElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const Component = forwardRef<HTMLParagraphElement, Props>(
  ({ asChild, themekey, className, variants, modifiers, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";

    const classes = getRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <Comp className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

Component.displayName = "TypePrimitive";

export const TypePrimitive = createRecastComponent<Props, BaseTheme>(Component);
