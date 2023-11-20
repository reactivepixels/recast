import React, { forwardRef } from "react";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement>;

const ComponentPreview = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={clsx(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border border-border",
          className,
        )}
        ref={ref}
        {...props}
      >
        <div className="flex min-h-[250px] w-full justify-center items-center p-10">
          {children}
        </div>
      </div>
    );
  },
);

ComponentPreview.displayName = "ComponentPreview";

export default ComponentPreview;
