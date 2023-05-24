import { Button as recast } from "@rpxl/recast-primitives";
import { forwardRef } from "react";

const ButtonPrimitive = recast("ButtonPrimitive", {
  defaults: { variant: "vanilla", size: "md" },
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
      // Defaults
      root: [
        "border-4",
        "border-[#F9EAD3]",
        "bg-[#FDFAF1]",
        "text-[#C69448]",
        "hover:border-[#FFE0B1]",
      ],
      // Size specific variants
      // sm: { root: "!border" },
      // md: { root: "!border-4" },
      // lg: { root: "!border-8" },
    },
    avocado: {
      root: [
        "border-4",
        "border-[#558303]",
        "bg-[#F2E880]",
        "text-[#AA471F]",
        "hover:border-[#356211]",
      ],
      // Size specific variants
      // sm: { root: "!border" },
      // md: { root: "!border-4" },
      // lg: { root: "!border-8" },
    },
    orange: {
      root: [
        "border-4",
        "border-[#F1970D]",
        "bg-[#FDB40B]",
        "text-white",
        "hover:border-[#E27221]",
      ],
      // Size specific variants
      // sm: { root: "!border" },
      // md: { root: "!border-4" },
      // lg: { root: "!border-8" },
    },
  },
  modifier: {
    block: {
      root: "w-full",
    },
    dark: {
      // root: "bg-red-500",
      vanilla: {
        root: "!bg-blue-500",
      },
    },
    floating: {
      // Defaults
      // root: "!shadow-sm",

      // Size specific modifiers
      sm: {
        root: "!shadow-lg",
      },
      md: {
        root: "!shadow-xl",
      },
      lg: {
        root: "!shadow-2xl",
      },

      // Variant specific modifiers
      // vanilla: {
      //   root: "!bg-blue-500",
      // },
      // avocado: {
      //   root: "!bg-blue-500",
      // },
      // orange: {
      //   root: "!bg-purple-500",
      // },
    },
  },
});

type ButtonPrimitiveProps = React.ComponentPropsWithRef<typeof ButtonPrimitive>;

const Button = forwardRef(
  (
    props: ButtonPrimitiveProps,
    ref: React.ForwardedRef<React.ComponentRef<typeof ButtonPrimitive>>
  ) => {
    return <ButtonPrimitive ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export default Button;
