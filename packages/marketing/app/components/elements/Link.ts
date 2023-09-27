import { RecastLinkPrimitive } from "../primitives";

export const Link = RecastLinkPrimitive.recast("Link", {
  defaults: { variant: "light" },
  base: {
    root: [
      "flex",
      "cursor-pointer",
      "justify-center",
      "items-center",
      "text-center",
      "font-mono",
      "gap-2",
    ],
  },
  variant: {
    primary: {
      root: "text-primary transition-opacity opacity-80 hover:opacity-100",
    },
    secondary: {
      root: "text-secondary transition-opacity opacity-80 hover:opacity-100",
    },
    dark: {
      root: "text-white transition-opacity opacity-80 hover:opacity-100",
    },
    light: {
      root: "text-ink transition-opacity opacity-80 hover:opacity-100",
    },
    unstyled: {},
  },
  modifier: {
    underline: {
      root: "underline",
    },
  },
});