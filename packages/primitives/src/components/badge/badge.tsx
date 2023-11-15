import React, { HTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

export type Props = HTMLAttributes<HTMLDivElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const BadgePrimitive = forwardRef<HTMLDivElement, Props>(
  (
    { themekey, className, size, variant, modifier, asChild, ...props },
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
      <Comp className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

BadgePrimitive.displayName = "BadgePrimitive";

export default createRecastComponent<Props, BaseTheme>(BadgePrimitive);
