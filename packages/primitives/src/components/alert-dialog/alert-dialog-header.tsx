import React, { forwardRef } from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

const Component = forwardRef<HTMLDivElement, Props>(({ ...props }, ref) => {
  return <div ref={ref} {...props} />;
});

Component.displayName = "AlertDialogHeaderPrimitive";

export const AlertDialogHeaderPrimitive = Component;
