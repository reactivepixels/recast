import React, { forwardRef } from "react";
import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "../../utils/cn.js";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Cancel
> &
  RecastThemeProps;

const AlertDialogCancelPrimitive = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Cancel>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
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
});

AlertDialogCancelPrimitive.displayName = "AlertDialogCancelPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AlertDialogCancelPrimitive,
);
