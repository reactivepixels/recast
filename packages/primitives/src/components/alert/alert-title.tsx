import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn.js";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.HTMLAttributes<HTMLHeadingElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const AlertTitlePrimitive = forwardRef<HTMLHeadingElement, Props>(
  (
    { themekey, className, size, variant, modifier, asChild, ...props },
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

export default createRecastComponent<Props, BaseTheme>(AlertTitlePrimitive);
