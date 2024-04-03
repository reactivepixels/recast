import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Trigger
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Trigger>,
  Props
>(({ ...props }, ref) => {
  return <RadixAlertDialogPrimitive.Trigger ref={ref} {...props} />;
});

Component.displayName = "AlertDialogTriggerPrimitive";

export const AlertDialogTriggerPrimitive = Component;
