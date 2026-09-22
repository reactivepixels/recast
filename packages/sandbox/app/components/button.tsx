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

// Create reusable button styles using the new API
const buttonStyles = recast.styles({
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
    "transition-colors",
    "cursor-pointer",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "w-full",
  ],
  variants: {
    /**
     * Controls the visual style of the button
     *
     * @default 'primary'
     */
    variant: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-red-500 text-white",
      tertiary: "bg-green-500 text-white",
    },
    /**
     * Controls the size of the button
     *
     * @default 'md'
     */
    size: {
      /**
       * Small text size
       */
      sm: "text-sm",
      md: "text-md",
      lg: "text-2xl",
    },
  },
  modifiers: {
    /**
     * Makes the component interactive with hover effects
     */
    interactive:
      "hover:scale-105 hover:shadow-md active:scale-100 cursor-pointer",
  },
});

// Apply styles to the component using the new API
export const Button = buttonStyles(Component);
