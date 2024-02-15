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
  typeof RadixAlertDialogPrimitive.Trigger
> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Trigger>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = getRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixAlertDialogPrimitive.Trigger
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

Component.displayName = "AlertDialogTriggerPrimitive";

export const AlertDialogTriggerPrimitive = createRecastComponent<
  Props,
  BaseTheme
>(Component);
