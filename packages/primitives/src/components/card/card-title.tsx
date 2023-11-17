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

export type Props = HTMLAttributes<HTMLHeadingElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const CardTitlePrimitive = forwardRef<HTMLHeadingElement, Props>(
  ({ themekey, className, variants, modifiers, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "h3";

    const classes = useRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return (
      <Comp className={cn(classes?.root, className)} ref={ref} {...props} />
    );
  },
);

CardTitlePrimitive.displayName = "CardTitlePrimitive";

export default createRecastComponent<Props, BaseTheme>(CardTitlePrimitive);
