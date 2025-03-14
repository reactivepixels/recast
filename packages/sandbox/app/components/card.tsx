"use client";

import { recast } from "@rpxl/recast";
import React, { HTMLAttributes, forwardRef } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const Component = forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Component.displayName = "CardPrimitive";

/**
 * Card color variants
 * @typedef {'default' | 'primary' | 'secondary' | 'accent'} CardColorVariant
 */

/**
 * Card size variants
 * @typedef {'sm' | 'md' | 'lg'} CardSizeVariant
 */

/**
 * Card border radius variants
 * @typedef {'none' | 'sm' | 'md' | 'lg' | 'full'} CardRadiusVariant
 */

export const Card = recast(Component, {
  defaults: {
    variants: { color: "default", size: "md", radius: "md" },
    modifiers: [],
  },
  base: [
    "flex",
    "flex-col",
    "overflow-hidden",
    "transition-all",
    "duration-200",
  ],
  variants: {
    /**
     * The color variant of the card
     * @param {CardColorVariant} color - Controls the color scheme of the card
     * - 'default' - White background with subtle border
     * - 'primary' - Blue background with white text
     * - 'secondary' - Gray background with dark text
     * - 'accent' - Accent color background with contrasting text
     */
    color: {
      /** White background with subtle border */
      default: "bg-white border border-gray-200 text-gray-900",
      /** Blue background with white text */
      primary: "bg-blue-500 text-white",
      /** Gray background with dark text */
      secondary: "bg-gray-100 text-gray-800",
      /** Accent color background with contrasting text */
      accent: "bg-purple-500 text-white",
    },
    /**
     * The size of the card
     * @param {CardSizeVariant} size - Controls the padding and overall size of the card
     * - 'sm' - Small padding, compact size
     * - 'md' - Medium padding, standard size
     * - 'lg' - Large padding, spacious size
     */
    size: {
      /** Small padding, compact size */
      sm: "p-3",
      /** Medium padding, standard size */
      md: "p-5",
      /** Large padding, spacious size */
      lg: "p-8",
    },
    /**
     * The border radius of the card
     * @param {CardRadiusVariant} radius - Controls the corner rounding of the card
     * - 'none' - No border radius, sharp corners
     * - 'sm' - Small border radius
     * - 'md' - Medium border radius
     * - 'lg' - Large border radius
     * - 'full' - Fully rounded corners
     */
    radius: {
      /** No border radius, sharp corners */
      none: "rounded-none",
      /** Small border radius */
      sm: "rounded-sm",
      /** Medium border radius */
      md: "rounded-md",
      /** Large border radius */
      lg: "rounded-lg",
      /** Fully rounded corners */
      full: "rounded-full",
    },
  },
  modifiers: {
    /**
     * Adds a shadow to the card
     * @param {boolean} shadowed - When true, adds a drop shadow to the card
     */
    shadowed: "shadow-lg",
    /**
     * Makes the card interactive with hover effects
     * @param {boolean} interactive - When true, adds hover and active states
     */
    interactive:
      "hover:scale-105 hover:shadow-md active:scale-100 cursor-pointer",
    /**
     * Adds a subtle hover effect to the card
     * @param {boolean} hoverable - When true, adds a subtle hover effect
     */
    hoverable: "hover:brightness-95",
  },
  conditionals: [
    {
      variants: { color: "primary" },
      modifiers: "interactive",
      className: "hover:bg-blue-600",
    },
    {
      variants: { color: "secondary" },
      modifiers: "interactive",
      className: "hover:bg-gray-200",
    },
  ],
});
