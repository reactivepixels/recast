"use client";

import { recast } from "@rpxl/recast";

import { Slot } from "@radix-ui/react-slot";
import React, { ButtonHTMLAttributes, forwardRef } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  block?: boolean;
  george?: string;
  size?: string;
};

const Component = forwardRef<HTMLButtonElement, Props>(
  ({ block, size, george, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    console.log(block);
    console.log(george);
    console.log(size);

    return <Comp ref={ref} {...props} />;
  }
);

Component.displayName = "ButtonPrimitive";

export const Button = recast(
  Component,
  {
    defaults: {
      variants: { variant: "primary", size: "md" },
    },
    base: ["flex", "items-center", "justify-center", "p-8"],
    variants: {
      /**
       * Defines the intent of the button.
       */
      variant: {
        primary: "bg-blue-500 text-white",
        secondary: [
          "bg-red-500",
          "text-white",
          "text-sm",
          "flex",
          "items-center",
          "justify-center",
          "p-8",
        ],
        tertiary: ["bg-green-500", "text-white"],
      },
      /**
       * Defines the size of the button.
       */
      size: {
        /** Small size - typically used for compact layouts */
        tiny: "text-sm",
        /** Medium size - the default size for most contexts */
        md: "text-base",
        /** Large size - used for emphasis or calls to action */
        huge: "text-2xl",
      },
      george: {
        /** Button A */
        sms: "max-w-4xl",
        /** B */
        md: "max-w-6xl",
        /** C */
        lg: "max-w-7xl",
      },
    },
    modifiers: {
      /** Large size - used for emphasis or calls to action */
      block: "w-full",
    },
    conditionals: [
      /** This condional is really cool. */
      {
        variants: { size: "tiny", variant: ["primary", "secondary"] },
        modifiers: ["block"],
        className: "border-4 border-blue-500 text-white",
      },
    ],
    breakpoints: ["sm", "md", "lg"],
  },
  {
    passThroughProps: ["size", "george"],
  }
);
