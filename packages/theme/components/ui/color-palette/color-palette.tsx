"use client";

import React, { forwardRef } from "react";

import { cn } from "@/utils/cn";

type Props = React.HTMLAttributes<HTMLDivElement>;

export const ColorPalette = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex rounded-sm overflow-hidden w-max", className)}
        {...props}
      >
        <div className="w-8 h-4 bg-primary-900 flex justify-center items-center">
          <span className="text-2xs">900</span>
        </div>
        <div className="w-8 h-4 bg-primary-800 flex justify-center items-center">
          <span className="text-2xs">800</span>
        </div>
        <div className="w-8 h-4 bg-primary-700 flex justify-center items-center">
          <span className="text-2xs">700</span>
        </div>
        <div className="w-8 h-4 bg-primary-600 flex justify-center items-center">
          <span className="text-2xs">600</span>
        </div>
        <div className="w-8 h-4 bg-primary-500 flex justify-center items-center">
          <span className="text-2xs">500</span>
        </div>
        <div className="w-8 h-4 bg-primary-400 flex justify-center items-center">
          <span className="text-2xs">400</span>
        </div>
        <div className="w-8 h-4 bg-primary-300 flex justify-center items-center">
          <span className="text-2xs text-black">300</span>
        </div>
        <div className="w-8 h-4 bg-primary-200 flex justify-center items-center">
          <span className="text-2xs text-black">200</span>
        </div>
        <div className="w-8 h-4 bg-primary-100 flex justify-center items-center">
          <span className="text-2xs text-black">100</span>
        </div>
      </div>
    );
  }
);

ColorPalette.displayName = "ColorPalette";
