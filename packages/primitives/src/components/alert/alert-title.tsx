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
  ({ themekey, className, variants, modifiers, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "h5";

    const classes = useRecastClasses<BaseTheme>({
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
