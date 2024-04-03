import React, { forwardRef } from "react";

import { cn } from "@/utils/cn";

type Props = React.HTMLAttributes<HTMLDivElement>;

const ComponentPreview = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "ring-offset-background focus-visible:ring-ring border-border relative mt-2 rounded-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          className,
        )}
        ref={ref}
        {...props}
      >
        <div className="flex min-h-[250px] w-full items-center justify-center p-10">
          {children}
        </div>
      </div>
    );
  },
);

ComponentPreview.displayName = "ComponentPreview";

export default ComponentPreview;
