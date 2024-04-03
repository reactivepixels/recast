import { Slot } from "@radix-ui/react-slot";
import React, { forwardRef } from "react";

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  asChild?: boolean;
};

const Component = forwardRef<HTMLHeadingElement, Props>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "h5";

    return <Comp ref={ref} {...props} />;
  },
);

Component.displayName = "AlertTitlePrimitive";

export const AlertTitlePrimitive = Component;
