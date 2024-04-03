import React, { HTMLAttributes, forwardRef } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

const Component = forwardRef<HTMLDivElement, Props>(({ ...props }, ref) => {
  return <footer ref={ref} {...props} />;
});

Component.displayName = "CardFooterPrimitive";

export const CardFooterPrimitive = Component;
