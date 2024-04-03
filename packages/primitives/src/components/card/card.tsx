import React, { HTMLAttributes, forwardRef } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

const Component = forwardRef<HTMLDivElement, Props>(({ ...props }, ref) => {
  return <div ref={ref} {...props} />;
});

Component.displayName = "CardPrimitive";

export const CardPrimitive = Component;
