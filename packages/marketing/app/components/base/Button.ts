import { ButtonPrimitive } from "@rpxl/recast-primitives";

export const styles = ButtonPrimitive.validate({
  defaults: { variant: "vanilla" },
  base: {
    root: [
      "flex",
      "rounded-full",
      "cursor-pointer",
      "justify-center",
      "items-center",
      "font-semibold",
      "text-center",
      "font-sans",
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
    vanilla: {
      root: [
        "border-4",
        "border-[#F9EAD3]",
        "bg-[#FDFAF1]",
        "text-[#C69448]",
        "hover:border-[#FFE0B1]",
      ],
    },
    avocado: {
      root: [
        "border-4",
        "border-[#558303]",
        "bg-[#F2E880]",
        "text-[#AA471F]",
        "hover:border-[#356211]",
      ],
    },
    orange: {
      root: [
        "border-4",
        "border-[#F1970D]",
        "bg-[#FDB40B]",
        "text-white",
        "hover:border-[#E27221]",
      ],
    },
  },
  modifier: {
    block: {
      root: "w-full",
    },
    dark: {
      vanilla: {
        root: "!bg-black !text-white",
      },
    },
    floating: {
      sm: {
        root: "!shadow-lg",
      },
      md: {
        root: "!shadow-xl",
      },
      lg: {
        root: "!shadow-2xl",
      },
    },
  },
});
