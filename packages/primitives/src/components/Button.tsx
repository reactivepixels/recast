import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "button";

type BaseTheme = RecastThemeProp<"root">;

export type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const ButtonPrimitive = forwardRef<HTMLButtonElement, Props>(
  (
    {
      themekey = DEFAULT_THEME_KEY,
      className,
      size,
      variant,
      modifier,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

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

export default createRecastComponent<Props, BaseTheme>(
  ButtonPrimitive,
  DEFAULT_THEME_KEY,
);
