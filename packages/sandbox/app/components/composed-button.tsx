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

Component.displayName = "ComposedButtonPrimitive";

// Create individual style objects that can be composed
const baseButtonStyles = recast.styles({
  base: [
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-md",
    "font-medium",
    "transition-colors",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "cursor-pointer",
  ],
});

const buttonColorStyles = recast.styles({
  variants: {
    variant: {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    },
  },
  defaults: {
    variants: { variant: "primary" },
  },
});

const buttonSizeStyles = recast.styles({
  variants: {
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    },
  },
  defaults: {
    variants: { size: "md" },
  },
});

const buttonEffectStyles = recast.styles({
  modifiers: {
    loading: "opacity-50 cursor-not-allowed",
    fullWidth: "w-full",
    shadow: "shadow-md hover:shadow-lg",
  },
});

// Compose all the style objects together
export const ComposedButton = recast.compose([
  baseButtonStyles,
  buttonColorStyles,
  buttonSizeStyles,
  buttonEffectStyles,
])(Component);
