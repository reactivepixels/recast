import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Overlay
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Content>,
  Props
>(({ ...props }, ref) => {
  return <RadixAlertDialogPrimitive.Overlay {...props} ref={ref} />;
});

Component.displayName = "AlertDialogOverlayPrimitive";

export const AlertDialogOverlayPrimitive = Component;
