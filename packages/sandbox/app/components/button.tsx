"use client";

import { ButtonPrimitive } from "@rpxl/recast-primitives";
import { recast } from "@rpxl/recast";

export const Button = recast(ButtonPrimitive, {
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
{
  /* <Button variant={{ default: "primary", md: "outline"}} size={{ default: "md", lg: "sm" }}>Sandbox</Button> */
}

const result = [
  "sm:flex",
  "md:flex",
  "lg:flex",
  "sm:items-center",
  "md:items-center",
  "lg:items-center",
  "sm:justify-center",
  "md:justify-center",
  "lg:justify-center",
  "sm:bg-blue-500",
  "md:bg-blue-500",
  "lg:bg-blue-500",
  "sm:text-white",
  "md:text-white",
  "lg:text-white",
  "sm:bg-red-500",
  "md:bg-red-500",
  "lg:bg-red-500",
  "sm:text-sm",
  "md:text-sm",
  "lg:text-sm",
  "sm:text-md",
  "md:text-md",
  "lg:text-md",
  "sm:text-lg",
  "md:text-lg",
  "lg:text-lg",
];
