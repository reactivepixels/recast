import { describe, it, expect } from "vitest";
import { getRecastClasses } from "../utils/getRecastClasses.js";
import { RelaxedStyles, RelaxedVariantProps, RelaxedModifierProps } from "../types.js";

type BreakpointKeys = "sm" | "md" | "lg" | "xl" | "2xl";

// Breakpoints type augmentation for the test file
declare module "../types.js" {
  export interface RecastBreakpoints extends Record<BreakpointKeys, string> {}
}

describe("getRecastClasses", () => {
  it("should generate base classes correctly", () => {
    const styles: RelaxedStyles = {
      base: "text-base font-normal",
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
    };
    const variants: RelaxedVariantProps = { size: "lg" };
    const modifiers: RelaxedModifierProps = ["disabled"];
    const result = getRecastClasses({ styles, variants, modifiers });
    expect(result.className).toBe("border-4");
  });

  it("should correctly combine base, responsive variants, and nested classes", () => {
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
    };
    const variants: RelaxedVariantProps = { size: { default: "sm", md: "lg" } };
    const modifiers: RelaxedModifierProps = ["disabled"];
    const result = getRecastClasses({ styles, variants, modifiers });

    expect(result.className).toBe("text-base text-sm md:text-lg opacity-50 border-4");
  });

  it("should handle complex edge cases correctly", () => {
    const styles: RelaxedStyles = {
      // @ts-expect-error Testing empty string and undefined in base classes array
      base: ["text-base", "", undefined, "font-normal"],
      variants: {
        color: {
          red: "text-red-500",
          blue: "text-blue-500",
          "": "",
          // @ts-expect-error Testing undefined as a variant value
          green: undefined,
        },
        size: {
          sm: "text-sm",
          md: "text-md",
          lg: "text-lg",
        },
      },
      modifiers: {
        disabled: "opacity-50 cursor-not-allowed",
        active: "",
        // @ts-expect-error Testing undefined as a modifier value
        hidden: undefined,
      },
      conditionals: [
        {
          variants: { color: "red", size: "lg" },
          modifiers: ["disabled"],
          className: "border-2 border-red-500",
        },
        {
          variants: { color: "" },
          modifiers: ["active"],
          className: "ring-2 ring-blue-500",
        },
      ],
    };

    const variants: RelaxedVariantProps = {
      color: { default: "red", md: "", lg: "green", xl: "blue" },
      size: { default: "sm", md: "lg", xl: undefined },
    };

    const modifiers: RelaxedModifierProps = ["disabled", "active", "hidden"];

    const result = getRecastClasses({ styles, variants, modifiers });

    expect(result.className).toBe(
      "text-base font-normal text-red-500 xl:text-blue-500 text-sm md:text-lg opacity-50 cursor-not-allowed border-2 border-red-500 ring-2 ring-blue-500",
    );
  });

  it("should handle empty input", () => {
    const result = getRecastClasses({ styles: {}, variants: {}, modifiers: [] });
    expect(result.className).toBe("");
  });

  it("should handle complex responsive variants", () => {
    const styles: RelaxedStyles = {
      variants: {
        color: {
          red: "text-red-500",
          blue: "text-blue-500",
          green: "text-green-500",
        },
        size: {
          sm: "text-sm",
          md: "text-md",
          lg: "text-lg",
        },
      },
    };
    const variants: RelaxedVariantProps = {
      color: { default: "red", sm: "blue", md: "green", lg: "blue", xl: "red" },
      size: { default: "sm", md: "lg", xl: "sm" },
    };
    const result = getRecastClasses({ styles, variants, modifiers: [] });
    expect(result.className).toBe(
      "text-red-500 sm:text-blue-500 md:text-green-500 lg:text-blue-500 xl:text-red-500 text-sm md:text-lg xl:text-sm",
    );
  });

  it("should handle conflicting conditionals", () => {
    const styles: RelaxedStyles = {
      conditionals: [
        {
          variants: { size: "sm" },
          className: "text-sm",
        },
        {
          variants: { size: "sm" },
          modifiers: ["active"],
          className: "text-lg font-bold",
        },
      ],
    };
    const variants: RelaxedVariantProps = { size: "sm" };
    const modifiers: RelaxedModifierProps = ["active"];
    const result = getRecastClasses({ styles, variants, modifiers });
    expect(result.className).toBe("text-sm text-lg font-bold");
  });

  it("should handle only base classes", () => {
    const styles: RelaxedStyles = {
      base: "text-base font-normal",
    };
    const result = getRecastClasses({ styles, variants: {}, modifiers: [] });
    expect(result.className).toBe("text-base font-normal");
  });

  it("should apply default variants and modifiers correctly", () => {
    const styles: RelaxedStyles = {
      variants: {
        color: {
          red: "text-red-500",
          blue: "text-blue-500",
        },
        size: {
          sm: "text-sm",
          lg: "text-lg",
        },
      },
      modifiers: {
        active: "font-bold",
        disabled: "opacity-50",
      },
      defaults: {
        variants: { color: "blue", size: "sm" },
        modifiers: ["active"],
      },
    };
    const variants: RelaxedVariantProps = { color: "red" };
    const result = getRecastClasses({ styles, variants, modifiers: [] });
    expect(result.className).toBe("text-red-500 text-sm font-bold");
  });

  it("should generate correct rcx output", () => {
    const styles: RelaxedStyles = {
      base: { default: "text-base", md: "text-lg" },
      variants: {
        color: {
          red: { default: "text-red-500", dark: "text-red-300" },
        },
      },
    };
    const variants: RelaxedVariantProps = { color: "red" };
    const result = getRecastClasses({ styles, variants, modifiers: [] });
    expect(result.rcx).toEqual({
      default: "text-base text-red-500",
      md: "text-lg",
      dark: "text-red-300",
    });
  });
});
