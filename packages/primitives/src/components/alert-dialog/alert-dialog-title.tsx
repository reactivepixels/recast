import React, { forwardRef } from "react";
import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/utils";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "alertDialogTitle";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Title
> &
  RecastThemeProps;

const AlertDialogTitlePrimitive = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Title>,
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
      <RadixAlertDialogPrimitive.Title
        ref={ref}
        className={cn(classes?.root, className)}
        {...props}
      />
    );
  },
);

AlertDialogTitlePrimitive.displayName = "AlertDialogTitlePrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AlertDialogTitlePrimitive,
  DEFAULT_THEME_KEY,
);
