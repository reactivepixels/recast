import { Slot } from "@radix-ui/react-slot";
import React, { HTMLAttributes, forwardRef } from "react";

type Props = HTMLAttributes<HTMLHeadingElement> & {
  asChild?: boolean;
};

const Component = forwardRef<HTMLHeadingElement, Props>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "h3";

    return <Comp ref={ref} {...props} />;
  },
);

Component.displayName = "CardTitlePrimitive";

export const CardTitlePrimitive = Component;
