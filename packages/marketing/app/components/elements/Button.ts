import { ButtonPrimitive } from "@rpxl/recast-primitives";

export const Button = ButtonPrimitive.recast({
  defaults: { variant: "primary", size: "md" },
  base: {
    root: [
      "flex",
      "rounded-full",
      "cursor-pointer",
      "justify-center",
      "items-center",
      "text-center",
      "font-mono",
      "gap-2",
      "transition-opacity",
    ],
  },
  size: {
    sm: {
      root: "px-6 py-2 text-sm",
    },
    md: {
      root: "px-8 py-2 text-md",
    },
    lg: {
      root: "px-12 py-4 text-lg",
    },
  },
  variant: {
    primary: {
      root: "bg-primary text-white",
    },
    link: {
      root: "text-primary !px-0",
    },
  },
  modifier: {
    block: {
      root: "w-full",
    },
    dark: {
      root: "text-white opacity-80 hover:opacity-100",
    },
  },
});
