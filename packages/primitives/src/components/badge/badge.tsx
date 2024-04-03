import { Slot } from "@radix-ui/react-slot";
import React, { HTMLAttributes, forwardRef } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
};

const Component = forwardRef<HTMLDivElement, Props>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return <Comp ref={ref} {...props} />;
  },
);

Component.displayName = "BadgePrimitive";

export const BadgePrimitive = Component;
