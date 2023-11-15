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
  typeof RadixAlertDialogPrimitive.Action
> &
  RecastThemeProps;

const AlertDialogActionPrimitive = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Action>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
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
});

AlertDialogActionPrimitive.displayName = "AlertDialogActionPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AlertDialogActionPrimitive,
);
