import React, { forwardRef } from "react";
import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "../../utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "alertDialogContent";

type BaseTheme = RecastThemeProp<"root"> & RecastThemeProp<"content">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Content
> &
  RecastThemeProps;

const AlertDialogContentPrimitive = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Content>,
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
      <RadixAlertDialogPrimitive.Portal>
        <RadixAlertDialogPrimitive.Overlay
          className={cn(classes?.root, className)}
        />
        <RadixAlertDialogPrimitive.Content
          ref={ref}
          className={cn(classes?.content, className)}
          {...props}
        />
      </RadixAlertDialogPrimitive.Portal>
    );
  },
);

AlertDialogContentPrimitive.displayName = "AlertDialogContentPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AlertDialogContentPrimitive,
  DEFAULT_THEME_KEY,
);
