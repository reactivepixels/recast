import React, { HTMLAttributes, forwardRef } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

const Component = forwardRef<HTMLDivElement, Props>(({ ...props }, ref) => {
  return <header ref={ref} {...props} />;
});

Component.displayName = "CardHeaderPrimitive";

export const CardHeaderPrimitive = Component;
