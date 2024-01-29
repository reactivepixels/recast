"use client";

import React, { forwardRef } from "react";

import { AnimatedNumber } from "../animated-number";
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
          "px-20 py-20",
          "relative justify-center flex flex-1 flex-col ",
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
            <div className="absolute -inset-x-64 -top-1 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent transform -translate-x-1/2 left-1/2"></div>
            <div className="absolute -inset-x-64 -bottom-1 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent transform -translate-x-1/2 left-1/2"></div>
            <div className="absolute -inset-y-64 -left-1 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent transform -translate-y-1/2 top-1/2"></div>
            <div className="absolute -inset-y-64 -right-1 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent transform -translate-y-1/2 top-1/2"></div>
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
            <div className="absolute inset-y-0 -left-1 h-screen transform -translate-y-1/2 w-px border-l border-dotted border-l-white/5"></div>
            <div className="absolute inset-y-0 -right-1 h-screen transform -translate-y-1/2 w-px border-r border-dotted border-r-white/5"></div>
            <div className="absolute inset-x-0 -top-1 w-screen transform -translate-x-1/2 h-px border-t border-dotted border-t-white/5"></div>
            <div className="absolute inset-x-0 -bottom-1 w-screen transform -translate-x-1/2 h-px border-b border-dotted border-b-white/5"></div>
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
