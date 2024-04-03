import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import React from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Portal
>;

const Component = ({ ...props }: Props) => {
  return <RadixAlertDialogPrimitive.Portal {...props} />;
};

Component.displayName = "AlertDialogPortalPrimitive";

export const AlertDialogPortalPrimitive = Component;
