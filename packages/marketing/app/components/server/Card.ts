import { Card as recast } from "@rpxl/recast-primitives/server";

export const Card = recast("Card", {
  defaults: { variant: "light" },
  base: {
    root: ["p-4 md:p-8 rounded-xl"],
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
