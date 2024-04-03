import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Title
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Title>,
  Props
>(({ ...props }, ref) => {
  return <RadixAlertDialogPrimitive.Title ref={ref} {...props} />;
});

Component.displayName = "AlertDialogTitlePrimitive";

export const AlertDialogTitlePrimitive = Component;
