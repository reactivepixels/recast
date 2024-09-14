"use client";

import { recast } from "@rpxl/recast";

import { Slot } from "@radix-ui/react-slot";
import React, { ButtonHTMLAttributes, forwardRef } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

const Component = forwardRef<HTMLButtonElement, Props>(
  ({ asChild = false, rcx, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    console.log(rcx);

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

// `default` is always required when defining responsive props.
/* <Button variant={{ default: "primary", md: "outline"}} size={{ default: "md", lg: "sm" }}>Sandbox</Button> */
