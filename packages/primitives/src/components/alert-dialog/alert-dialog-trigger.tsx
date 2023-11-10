import React, { forwardRef } from "react";
import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "alertDialogTrigger";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Trigger
> &
  RecastThemeProps;

const AlertDialogTriggerPrimitive = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Trigger>,
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
      <RadixAlertDialogPrimitive.Trigger
        className={cn(classes?.root, className)}
        ref={ref}
        {...props}
      />
    );
  },
);

AlertDialogTriggerPrimitive.displayName = "AlertDialogOverlayPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AlertDialogTriggerPrimitive,
  DEFAULT_THEME_KEY,
);
