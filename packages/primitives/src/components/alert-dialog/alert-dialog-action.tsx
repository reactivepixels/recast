import React, { forwardRef } from "react";
import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "../../utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "alertDialogAction";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Action
> &
  RecastThemeProps;

const AlertDialogActionPrimitive = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Action>,
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
      <RadixAlertDialogPrimitive.Action
        ref={ref}
        className={cn(classes?.root, className)}
        {...props}
      />
    );
  },
);

AlertDialogActionPrimitive.displayName = "AlertDialogActionPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AlertDialogActionPrimitive,
  DEFAULT_THEME_KEY,
);
