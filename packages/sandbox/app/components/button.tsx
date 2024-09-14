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
  base: ["flex", "items-center", "justify-center"],
  variants: {
    variant: {
      primary: "bg-blue-500 text-white md:text-white",
      secondary: ["bg-red-500", "text-white"],
    },
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    },
  },
  breakpoints: ["sm", "md", "lg"],
});

// flex sm:flex md:flex lg:flex items-center sm:items-center
// md:items-center lg:items-center justify-center sm:justify-center
// md:justify-center lg:justify-center bg-blue-500 text-white
// md:text-white md:bg-red-500 md:text-white text-md lg:text-sm
// md:text-lg

// `default` is always required when defining responsive props.
/* <Button variant={{ default: "primary", md: "outline"}} size={{ default: "md", lg: "sm" }}>Sandbox</Button> */
