import { cn } from "../../utils/cn.js";
import { Slot } from "@radix-ui/react-slot";
import { RecastWithClassNameProps } from "@rpxl/recast";
import React, { forwardRef } from "react";

type Props = React.HTMLAttributes<HTMLElement> & {
  asChild?: boolean;
} & RecastWithClassNameProps<{
    root: string;
    inner: string;
  }>;

const Component = forwardRef<HTMLElement, Props>(
  ({ rcx, children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "section";

    return (
      <Comp className={cn(rcx?.root, className)} ref={ref} {...props}>
        <div className={rcx?.inner}>{children}</div>
      </Comp>
    );
  },
);

Component.displayName = "SectionWrapperPrimitive";

export const SectionWrapperPrimitive = Component;
