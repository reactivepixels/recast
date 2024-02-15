import * as RadixSwitchPrimitive from "@radix-ui/react-switch";

import React, { forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root" | "thumb">;

type Props = React.ComponentPropsWithoutRef<typeof RadixSwitchPrimitive.Root> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixSwitchPrimitive.Root>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = getRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixSwitchPrimitive.Root
      ref={ref}
      className={cn(classes?.root, className)}
      {...props}
    >
      <RadixSwitchPrimitive.Thumb className={classes?.thumb} />
    </RadixSwitchPrimitive.Root>
  );
});

Component.displayName = "SwitchPrimitive";

export const SwitchPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
