"use client";

import React, { forwardRef } from "react";

import { AnimatedNumber } from "../animated-number";
import { HorizontalGridLine } from "./horizontal-grid-line";
import { VerticalGridLine } from "./vertical-grid-line";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { useElementSize } from "usehooks-ts";

type Props = React.HTMLAttributes<HTMLDivElement>;

const Blueprint = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    const [componentRef, { width, height }] = useElementSize();

    return (
      <div
        ref={ref}
        className={cn(
          "px-20 py-20 relative justify-center flex flex-1 flex-col",
          className
        )}
        {...props}
      >
        <div className="mx-auto w-auto">
          <div className="p-1 relative">
            <div className="w-full">
              <div className="font-mono text-xs -top-10 left-1/2 transform -translate-x-1/2 absolute">
                <AnimatedNumber value={width} />
                px
              </div>
              <motion.div
                animate={{ width: width - 8 }}
                className="absolute -top-4 h-px bg-neutral-500 transform -translate-x-1/2 left-1/2 before:bg-neutral-500 before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:w-px before:h-1.5 before:flex before:absolute after:bg-neutral-500 after:right-0 after:top-1/2 after:transform after:-translate-y-1/2 after:w-px after:h-1.5 after:flex after:absolute"
              />
            </div>
            <HorizontalGridLine className="-top-1" />
            <HorizontalGridLine className="-bottom-1" />
            <VerticalGridLine className="-left-1" />
            <VerticalGridLine className="-right-1" />
            <div className="h-full">
              <div className="font-mono text-xs -right-14 top-1/2 transform -translate-y-1/2 absolute">
                <AnimatedNumber value={height} />
                px
              </div>
              <motion.div
                animate={{ height: height - 8 }}
                className="absolute -right-4 w-px bg-neutral-500 transform -translate-y-1/2 top-1/2 before:bg-neutral-500 before:top-0 before:left-1/2 before:transform before:-translate-x-1/2 before:h-px before:w-1.5 before:flex before:absolute after:bg-neutral-500 after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:h-px after:w-1.5 after:flex after:absolute"
              />
            </div>

            <div className="flex" ref={componentRef}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Blueprint.displayName = "Blueprint";

export default Blueprint;
