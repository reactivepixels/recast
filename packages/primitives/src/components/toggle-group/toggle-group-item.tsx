import * as RadixToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import React, { forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root" | "thumb">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixToggleGroupPrimitive.Item
> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixToggleGroupPrimitive.Item>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = getRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixToggleGroupPrimitive.Item
      ref={ref}
      className={cn(classes?.root, className)}
      {...props}
    />
  );
});

Component.displayName = "ToggleGroupItemPrimitive";

export const ToggleGroupItemPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
