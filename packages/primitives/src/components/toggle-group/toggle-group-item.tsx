import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root" | "thumb">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixToggleGroupPrimitive.Item
> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixToggleGroupPrimitive.Item>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
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
