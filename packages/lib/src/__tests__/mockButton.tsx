import ButtonPrimitive from "./mockButtonPrimitive.js";

export const MockButton = ButtonPrimitive.recast({
  base: {
    root: [],
  },
  variants: {
    intent: {
      default: {
        root: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
    },
    size: {
      default: { root: "h-10 px-4 py-2" },
    },
  },
  modifiers: {
    block: {
      root: ["w-full"],
    },
    floating: {
      root: "shadow-lg",
    },
  },
});
