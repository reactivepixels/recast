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

/**
 * Button variants
 * @typedef {'primary' | 'secondary' | 'tertiary'} ButtonVariant
 */

/**
 * Button sizes
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 */

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
     * The variant of the button
     * @param {ButtonVariant} variant - Controls the visual style of the button
     * - 'primary' - Blue background with white text, used for main actions
     * - 'secondary' - Red background with white text, used for secondary actions
     * - 'tertiary' - Green background with white text, used for tertiary actions
     */
    variant: {
      /** Blue background with white text, used for main actions */
      primary: "bg-blue-500 text-white",
      /** Red background with white text, used for secondary actions */
      secondary: ["bg-red-500", "text-white"],
      /** Green background with white text, used for tertiary actions */
      tertiary: ["bg-green-500", "text-white"],
    },
    /**
     * The size of the button
     * @param {ButtonSize} size - Controls the size of the button
     * - 'sm' - Small text size
     * - 'md' - Medium text size
     * - 'lg' - Large text size
     */
    size: {
      /** Small text size */
      sm: "text-sm",
      /** Medium text size */
      md: "text-md",
      /** Large text size */
      lg: "text-2xl",
    },
  },
});
