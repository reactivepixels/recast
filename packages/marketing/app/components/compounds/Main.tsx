"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement>;

const Main = forwardRef<HTMLHeadingElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <main
        className={clsx(
          className,
          "flex flex-col items-center justify-between p-24 flex-grow"
        )}
        ref={ref}
        {...props}
      >
        {children}
      </main>
    );
  }
);

if (process.env["NODE_ENV"] !== "production") Main.displayName = "Main";

export default Main;
