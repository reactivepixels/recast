"use client";

import { AlertPrimitive } from "@rpxl/recast-primitives";

export const Alert = AlertPrimitive.recast({
  defaults: { variants: { variant: "default" } },
  base: {
    root: [
      "relative",
      "w-full",
      "rounded-lg",
      "border",
      "px-4",
      "py-3",
      "text-sm",
      "[&>svg+div]:translate-y-[-3px]",
      "[&>svg]:absolute",
      "[&>svg]:left-4",
      "[&>svg]:top-4",
      "[&>svg]:text-foreground",
      "[&>svg~*]:pl-7",
    ],
  },
  variants: {
    variant: {
      default: {
        root: "bg-background text-foreground border-border",
      },
      destructive: {
        root: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
  },
});
