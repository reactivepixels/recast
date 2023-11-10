import React, { forwardRef } from "react";
import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "alertDialogDescription";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Description
> &
  RecastThemeProps;

const AlertDialogDescriptionPrimitive = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Description>,
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
      <RadixAlertDialogPrimitive.Description
        ref={ref}
        className={cn(classes?.root, className)}
        {...props}
      />
    );
  },
);

AlertDialogDescriptionPrimitive.displayName = "AlertDialogDescriptionPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AlertDialogDescriptionPrimitive,
  DEFAULT_THEME_KEY,
);
