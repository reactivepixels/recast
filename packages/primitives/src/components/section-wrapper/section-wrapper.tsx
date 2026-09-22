import { cn } from "../../utils/cn.js";
import { Slot } from "@radix-ui/react-slot";
import { RecastClsProps } from "@rpxl/recast";
import React, { forwardRef } from "react";

type Props = React.HTMLAttributes<HTMLElement> & {
  asChild?: boolean;
} & RecastClsProps<"root" | "inner">;

const Component = forwardRef<HTMLElement, Props>(
  ({ cls, children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "section";

    return (
      <Comp className={cn(cls?.root, className)} ref={ref} {...props}>
        <div className={cls?.inner}>{children}</div>
      </Comp>
    );
  },
);

Component.displayName = "SectionWrapperPrimitive";

export const SectionWrapperPrimitive = Component;
