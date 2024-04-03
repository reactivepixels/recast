import React, { forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Component = forwardRef<HTMLInputElement, Props>(({ ...props }, ref) => {
  return <input ref={ref} {...props} />;
});

Component.displayName = "InputPrimitive";

export const InputPrimitive = Component;
