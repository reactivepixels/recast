"use client";

import React, { forwardRef } from "react";

import { cn } from "@/utils/cn";

type Props = React.HTMLAttributes<HTMLSpanElement>;

export const VerticalGridLine = forwardRef<HTMLSpanElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "absolute -inset-y-64 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent transform -translate-y-1/2 top-1/2",
          className
        )}
        {...props}
      />
    );
  }
);

VerticalGridLine.displayName = "VerticalGridLine";
