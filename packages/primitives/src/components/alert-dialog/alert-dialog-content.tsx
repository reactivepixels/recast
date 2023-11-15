import React, { forwardRef } from "react";
import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root" | "content">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Content
> &
  RecastThemeProps;

const AlertDialogContentPrimitive = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Content>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
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
});

AlertDialogContentPrimitive.displayName = "AlertDialogContentPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AlertDialogContentPrimitive,
);
