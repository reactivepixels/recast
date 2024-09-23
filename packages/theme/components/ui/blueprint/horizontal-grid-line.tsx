"use client";

import React, { forwardRef } from "react";

import { cn } from "@/utils/cn";

type Props = React.HTMLAttributes<HTMLSpanElement>;

export const HorizontalGridLine = forwardRef<HTMLSpanElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "absolute -inset-x-64 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent transform -translate-x-1/2 left-1/2",
          className
        )}
        {...props}
      />
    );
  }
);

HorizontalGridLine.displayName = "HorizontalGridLine";
