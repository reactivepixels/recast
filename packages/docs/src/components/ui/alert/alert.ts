"use client";

import { AlertPrimitive } from "@rpxl/recast-primitives/alert";

export const Alert = AlertPrimitive.recast("Alert", {
  defaults: { variant: "default" },
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
  variant: {
    default: {
      root: "bg-background text-foreground",
    },
    destructive: {
      root: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
    },
  },
});
