import React, { forwardRef } from "react";
import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "alertDialogCancel";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Cancel
> &
  RecastThemeProps;

const AlertDialogCancelPrimitive = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Cancel>,
  Props
>(
  (
    {
      themekey = DEFAULT_THEME_KEY,
      className,
      size,
      variant,
      modifier,
      ...props
    },
    ref,
  ) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
    });

    return (
      <RadixAlertDialogPrimitive.Cancel
        ref={ref}
        className={cn(classes?.root, className)}
        {...props}
      />
    );
  },
);

AlertDialogCancelPrimitive.displayName = "AlertDialogCancelPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AlertDialogCancelPrimitive,
  DEFAULT_THEME_KEY,
);
