import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import React, { forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Cancel
> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Cancel>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = getRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixAlertDialogPrimitive.Cancel
      ref={ref}
      className={cn(classes?.root, className)}
      {...props}
    />
  );
});

Component.displayName = "AlertDialogCancelPrimitive";

export const AlertDialogCancelPrimitive = createRecastComponent<
  Props,
  BaseTheme
>(Component);
