import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

export type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const ButtonPrimitive = forwardRef<HTMLButtonElement, Props>(
  (
    { themekey, className, size, variant, modifier, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    console.log(modifier);

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

ButtonPrimitive.displayName = "ButtonPrimitive";

export default createRecastComponent<Props, BaseTheme>(ButtonPrimitive);