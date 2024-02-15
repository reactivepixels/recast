import * as RadixAvatarPrimitive from "@radix-ui/react-avatar";

import React, { forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.ComponentPropsWithoutRef<typeof RadixAvatarPrimitive.Root> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixAvatarPrimitive.Root>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = getRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixAvatarPrimitive.Root
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

Component.displayName = "AvatarPrimitive";

export const AvatarPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
