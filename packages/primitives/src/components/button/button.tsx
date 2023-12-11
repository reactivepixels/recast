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

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const Component = forwardRef<HTMLButtonElement, Props>(
  (
    { themekey, className, variants, modifiers, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

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

Component.displayName = "ButtonPrimitive";

export const ButtonPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
