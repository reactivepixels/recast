"use client";

import { recast } from "@rpxl/recast";

import { Slot } from "@radix-ui/react-slot";
import React, { ButtonHTMLAttributes, forwardRef } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

const Component = forwardRef<HTMLButtonElement, Props>(
  ({ asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return <Comp ref={ref} {...props} />;
  }
);

Component.displayName = "ButtonPrimitive";

export const Button = recast(Component, {
  defaults: {
    variants: { variant: "primary", size: "md" },
  },
  base: [
    "flex",
    "items-center",
    "justify-center",
    "py-8",
    "px-12",
    "rounded-full",
    "font-medium",
    "ring-offset-background",
    "transition-colors",
    "focus:ring-blue-300",
    "dark:focus:ring-blue-800",
    "cursor-pointer",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "w-full",
    "lg:w-auto",
  ],
  variants: {
    variant: {
      primary: "bg-blue-500 text-white",
      secondary: ["bg-red-500", "text-white"],
      tertiary: ["bg-green-500", "text-white"],
    },
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-2xl",
    },
  },
});
