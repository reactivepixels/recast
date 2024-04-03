import { Slot } from "@radix-ui/react-slot";
import React, { forwardRef } from "react";

type Props = React.HTMLAttributes<HTMLParagraphElement> & {
  asChild?: boolean;
};

const Component = forwardRef<HTMLParagraphElement, Props>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";

    return <Comp ref={ref} {...props} />;
  },
);

Component.displayName = "TypePrimitive";

export const TypePrimitive = Component;
