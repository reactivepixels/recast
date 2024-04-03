import { Slot } from "@radix-ui/react-slot";
import React, { forwardRef } from "react";

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  asChild?: boolean;
};

const Component = forwardRef<HTMLHeadingElement, Props>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return <Comp ref={ref} {...props} />;
  },
);

Component.displayName = "StackPrimitive";

export const StackPrimitive = Component;
