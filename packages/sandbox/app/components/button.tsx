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
     *
     * @description Possible values:
     * - `'primary'` - Blue background with white text, used for main actions.
     * - `'secondary'` - Red background with white text, used for secondary actions.
     * - `'tertiary'` - Green background with white text, used for tertiary actions.
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
     *
     * @description Possible values:
     * - `'sm'` - Small text size
     * - `'md'` - Medium text size
     * - `'lg'` - Large text size
     */
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-2xl",
    },
  },
  modifiers: {
    /**
     * Makes the component interactive with hover effects
     * @param {boolean} interactive - When true, adds hover and active states
     */
    interactive:
      "hover:scale-105 hover:shadow-md active:scale-100 cursor-pointer",
  },
});
