import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Cancel
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Cancel>,
  Props
>(({ ...props }, ref) => {
  return <RadixAlertDialogPrimitive.Cancel ref={ref} {...props} />;
});

Component.displayName = "AlertDialogCancelPrimitive";

export const AlertDialogCancelPrimitive = Component;
