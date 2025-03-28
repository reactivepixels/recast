import { describe, it, expect } from "vitest";
import { getRecastClasses } from "../utils/getRecastClasses.js";
import { RelaxedStyles, RelaxedVariantProps, RelaxedModifierProps } from "../types.js";

describe("getRecastClasses", () => {
  describe("Basic Functionality", () => {
    it("should generate base classes correctly", () => {
      const styles: RelaxedStyles = {
        base: "text-base font-normal",
      };
      const result = getRecastClasses({ styles, variants: {}, modifiers: {} });
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
      const result = getRecastClasses({ styles, variants, modifiers: {} });
      expect(result.className).toBe("text-base");
    });

    it("should generate modifier classes correctly", () => {
      const styles: RelaxedStyles = {
        modifiers: {
          disabled: "opacity-50 cursor-not-allowed",
        },
      };
      const modifiers: RelaxedModifierProps = { disabled: true };
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
      const modifiers: RelaxedModifierProps = { disabled: true };
      const result = getRecastClasses({ styles, variants, modifiers });
      expect(result.className).toBe("border-4");
    });

    it("should handle only base classes", () => {
      const styles: RelaxedStyles = {
        base: "text-base font-normal",
      };
      const result = getRecastClasses({ styles, variants: {}, modifiers: {} });
      expect(result.className).toBe("text-base font-normal");
    });

    it("should handle empty input", () => {
      const result = getRecastClasses({ styles: {}, variants: {}, modifiers: {} });
      expect(result.className).toBe("");
    });

    it("should handle empty variant and modifier objects", () => {
      const styles: RelaxedStyles = {
        base: "text-base",
        variants: {},
        modifiers: {},
      };
      const result = getRecastClasses({ styles, variants: {}, modifiers: {} });
      expect(result.className).toBe("text-base");
    });
  });

  describe("Complex Scenarios", () => {
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
      const variants: RelaxedVariantProps = { size: "md" };
      const modifiers: RelaxedModifierProps = { disabled: true };
      const result = getRecastClasses({ styles, variants, modifiers });

      expect(result.className).toBe("text-base text-md opacity-50");
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
        color: "red",
        size: "lg",
      };

      const modifiers: RelaxedModifierProps = { disabled: true, active: true, hidden: true };

      const result = getRecastClasses({ styles, variants, modifiers });

      expect(result.className).toBe(
        "text-base font-normal text-red-500 text-lg opacity-50 cursor-not-allowed border-2 border-red-500",
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
      const modifiers: RelaxedModifierProps = { active: true };
      const result = getRecastClasses({ styles, variants, modifiers });
      expect(result.className).toBe("text-sm text-lg font-bold");
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
      const result = getRecastClasses({ styles, variants, modifiers: {} });
      expect(result.className).toBe("text-red-500 text-sm font-bold");
    });

    it("should correctly combine base, variants, and modifiers", () => {
      const styles: RelaxedStyles = {
        base: "text-base font-normal",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
          color: {
            primary: "text-blue-500",
            secondary: "text-green-500",
          },
        },
        modifiers: {
          disabled: "opacity-50 cursor-not-allowed",
        },
      };
      const variants: RelaxedVariantProps = { size: "lg", color: "primary" };
      const modifiers: RelaxedModifierProps = { disabled: true };
      const result = getRecastClasses({ styles, variants, modifiers });
      expect(result.className).toBe("text-base font-normal text-lg text-blue-500 opacity-50 cursor-not-allowed");
    });

    it("should handle undefined or non-existent variants", () => {
      const styles: RelaxedStyles = {
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
        },
      };
      const variants: RelaxedVariantProps = { size: "md", color: "primary" };
      const result = getRecastClasses({ styles, variants, modifiers: {} });
      expect(result.className).toBe("");
    });

    it("should apply conditional styles correctly", () => {
      const styles: RelaxedStyles = {
        conditionals: [
          {
            variants: { size: "lg" },
            modifiers: ["disabled"],
            className: "border-2 border-red-500",
          },
        ],
      };
      const variants: RelaxedVariantProps = { size: "lg" };
      const modifiers: RelaxedModifierProps = { disabled: true };
      const result = getRecastClasses({ styles, variants, modifiers });
      expect(result.className).toBe("border-2 border-red-500");
    });

    it("should combine multiple modifiers correctly", () => {
      const styles: RelaxedStyles = {
        modifiers: {
          disabled: "opacity-50 cursor-not-allowed",
          loading: "animate-pulse",
        },
      };
      const modifiers: RelaxedModifierProps = { disabled: true, loading: true };
      const result = getRecastClasses({ styles, variants: {}, modifiers });
      expect(result.className).toBe("opacity-50 cursor-not-allowed animate-pulse");
    });

    it("should handle complex conditional styles", () => {
      const styles: RelaxedStyles = {
        conditionals: [
          {
            variants: { size: "lg", color: "primary" },
            modifiers: ["active"],
            className: "shadow-lg ring-2 ring-blue-500",
          },
        ],
      };
      const variants: RelaxedVariantProps = { size: "lg", color: "primary" };
      const modifiers: RelaxedModifierProps = { active: true };
      const result = getRecastClasses({ styles, variants, modifiers });
      expect(result.className).toBe("shadow-lg ring-2 ring-blue-500");
    });
  });

  describe("CLS Output", () => {
    it("should generate correct cls output", () => {
      const styles: RelaxedStyles = {
        base: { default: "text-base", md: "text-lg" },
        variants: {
          color: {
            red: { default: "text-red-500", dark: "text-red-300" },
          },
        },
      };
      const variants: RelaxedVariantProps = { color: "red" };
      const result = getRecastClasses({ styles, variants, modifiers: {} });
      expect(result.cls).toEqual({
        default: "text-base text-red-500",
        md: "text-lg",
        dark: "text-red-300",
      });
    });
  });
});
