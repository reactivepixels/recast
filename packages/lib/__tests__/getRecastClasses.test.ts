import { describe, it, expect } from "vitest";
import { getRecastClasses } from "../src/utils/getRecastClasses";
import { RelaxedStyles, RelaxedVariantProps, RelaxedModifierProps } from "../src/types";

describe("getRecastClasses", () => {
  it("should generate base classes correctly", () => {
    const styles: RelaxedStyles = {
      base: "text-base font-normal",
      breakpoints: ["sm", "md", "lg"],
    };
    const result = getRecastClasses({ styles, variants: {}, modifiers: [] });
    expect(result.className).toBe("text-base font-normal");
  });

  it("should generate variant classes correctly", () => {
    const styles: RelaxedStyles = {
      variants: {
        size: {
          sm: "text-sm",
          md: "text-base",
          lg: "text-lg",
        },
      },
      breakpoints: ["sm", "md", "lg"],
    };
    const variants: RelaxedVariantProps = {
      size: "md",
    };
    const result = getRecastClasses({ styles, variants, modifiers: [] });
    expect(result.className).toBe("text-base");
  });

  it("should generate responsive variant classes correctly", () => {
    const styles: RelaxedStyles = {
      variants: {
        size: {
          sm: "text-sm",
          md: "text-base",
          lg: "text-lg",
        },
      },
      breakpoints: ["sm", "md", "lg"],
    };
    const variants: RelaxedVariantProps = {
      size: { default: "sm", md: "lg" },
    };
    const result = getRecastClasses({ styles, variants, modifiers: [] });
    expect(result.className).toBe("text-sm md:text-lg");
  });

  it("should generate modifier classes correctly", () => {
    const styles: RelaxedStyles = {
      modifiers: {
        disabled: "opacity-50 cursor-not-allowed",
      },
      breakpoints: ["sm", "md", "lg"],
    };
    const modifiers: RelaxedModifierProps = ["disabled"];
    const result = getRecastClasses({ styles, variants: {}, modifiers });
    expect(result.className).toBe("opacity-50 cursor-not-allowed");
  });

  it("should generate conditional classes correctly", () => {
    const styles: RelaxedStyles = {
      conditionals: [
        {
          variants: { size: "lg" },
          modifiers: ["disabled"],
          className: "border-4",
        },
      ],
      breakpoints: ["sm", "md", "lg"],
    };
    const variants: RelaxedVariantProps = { size: "lg" };
    const modifiers: RelaxedModifierProps = ["disabled"];
    const result = getRecastClasses({ styles, variants, modifiers });
    expect(result.className).toBe("border-4");
  });

  it("should...", () => {
    const styles: RelaxedStyles = {
      base: ["flex", "items-center", "justify-center"],
      variants: {
        variant: {
          primary: "bg-blue-500 text-white md:text-white",
          secondary: ["bg-red-500", "text-white"],
        },
        size: {
          sm: "text-sm",
          md: "text-md",
          lg: "text-lg",
        },
      },
    };

    const variants: RelaxedVariantProps = {
      size: { default: "sm", md: "lg", lg: "sm" },
      variant: { default: "primary", md: "secondary" },
    };

    const result = getRecastClasses({ styles, variants, modifiers: [] });
    expect(result.className).toBe(
      "flex items-center justify-center text-sm md:text-lg lg:text-sm bg-blue-500 text-white md:text-white md:bg-red-500 md:text-white",
    );
  });

  it("should combine all types of classes correctly", () => {
    const styles: RelaxedStyles = {
      base: "text-base",
      variants: {
        size: {
          sm: "text-sm",
          md: "text-md",
          lg: "text-lg",
        },
      },
      modifiers: {
        disabled: "opacity-50",
      },
      conditionals: [
        {
          variants: { size: "lg" },
          modifiers: ["disabled"],
          className: "border-4",
        },
      ],
      breakpoints: ["sm", "md", "lg"],
    };
    const variants: RelaxedVariantProps = { size: { default: "sm", md: "lg" } };
    const modifiers: RelaxedModifierProps = ["disabled"];
    const result = getRecastClasses({ styles, variants, modifiers });

    expect(result.className).toBe("text-base text-sm md:text-lg opacity-50 border-4");
  });
});
