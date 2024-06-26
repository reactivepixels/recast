import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Content
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Content>,
  Props
>(({ ...props }, ref) => {
  return <RadixAlertDialogPrimitive.Content ref={ref} {...props} />;
});

Component.displayName = "AlertDialogContentPrimitive";

export const AlertDialogContentPrimitive = Component;
