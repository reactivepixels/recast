import { RecastButtonPrimitive } from "@rpxl/recast-primitives";

export const DemoButton = RecastButtonPrimitive.recast("DemoButton", {
  defaults: { variant: "primary", size: "medium" },
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
    small: {
      root: "px-4 py-2 text-xs",
    },
    medium: {
      root: "px-8 py-2 text-md",
    },
    large: {
      root: "px-12 py-4 text-lg",
    },
    mini: {
      root: "px-4 py-2 text-xs",
    },
    humongous: {
      root: "px-12 py-4 text-lg",
    },
  },
  variant: {
    primary: {
      root: "bg-primary text-white",
    },
    secondary: {
      root: "bg-secondary text-white",
    },
    rainbow: {
      root: "bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400 text-white",
    },
    outline: {
      root: "bg-transparent text-white border border-px border-white",
    },
  },
  modifier: {
    block: {
      root: "w-full",
    },
    unicorn: {
      root: "before:content-['🦄']",
    },
    cookie: {
      root: "after:content-['🍪']",
    },
    shimmer: {
      root: "btn-shimmer",
    },
  },
});
