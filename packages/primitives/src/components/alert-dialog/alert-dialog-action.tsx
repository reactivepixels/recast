import React, { forwardRef } from "react";
import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Action
> &
  RecastThemeProps;

const AlertDialogActionPrimitive = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Action>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
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
