import React, { HTMLAttributes, forwardRef } from "react";

type Props = HTMLAttributes<HTMLParagraphElement>;

const Component = forwardRef<HTMLParagraphElement, Props>(
  ({ ...props }, ref) => {
    return <p ref={ref} {...props} />;
  },
);

Component.displayName = "CardDescriptionPrimitive";

export const CardDescriptionPrimitive = Component;
