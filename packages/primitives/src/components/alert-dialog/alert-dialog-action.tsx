import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Action
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Action>,
  Props
>(({ ...props }, ref) => {
  return <RadixAlertDialogPrimitive.Action ref={ref} {...props} />;
});

Component.displayName = "AlertDialogActionPrimitive";

export const AlertDialogActionPrimitive = Component;
