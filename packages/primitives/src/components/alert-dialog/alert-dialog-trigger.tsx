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
  typeof RadixAlertDialogPrimitive.Trigger
> &
  RecastThemeProps;

const AlertDialogTriggerPrimitive = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Trigger>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
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
});

AlertDialogTriggerPrimitive.displayName = "AlertDialogOverlayPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AlertDialogTriggerPrimitive,
);
