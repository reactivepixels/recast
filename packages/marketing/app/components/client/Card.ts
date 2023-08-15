"use client";

import { CardPrimitive } from "@rpxl/recast-primitives/client";
// import { styles } from "../base/Card";

export const Card = CardPrimitive.recast("Card", {
  defaults: { variant: "light" },
  base: {
    root: ["p-4 md:p-8 rounded-xl"],
  },
  size: {
    sm: {
      root: "",
    },
    md: {
      root: "",
    },
    lg: {
      root: "",
    },
  },
  variant: {
    light: {
      root: ["bg-gray-200", "border-gray-200", "hover:border-gray-300"],
    },
    dark: {
      root: ["bg-gray-200", "border-gray-200", "hover:border-gray-300"],
    },
  },
  modifier: {
    clickable: {
      root: ["border-2", "transition-colors", "cursor-pointer"],
    },
    muted: {
      root: ["bg-opacity-40"],
    },
    elevated: {
      root: ["shadow-lg"],
    },
  },
});
