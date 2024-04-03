import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Description
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Description>,
  Props
>(({ ...props }, ref) => {
  return <RadixAlertDialogPrimitive.Description ref={ref} {...props} />;
});

Component.displayName = "AlertDialogDescriptionPrimitive";

export const AlertDialogDescriptionPrimitive = Component;
