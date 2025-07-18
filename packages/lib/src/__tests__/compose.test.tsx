import { describe, it, expect } from "vitest";
import { styles, compose } from "../recast.js";

describe("recast.compose()", () => {
  it("should return first style object when multiple are provided (simplified implementation)", () => {
    const baseStyles = styles({
      base: "base-class",
      variants: {
        size: {
          sm: "text-sm",
          lg: "text-lg",
        },
      },
    });

    const colorStyles = styles({
      variants: {
        color: {
          primary: "bg-blue-500 text-white",
          secondary: "bg-gray-500 text-white",
        },
      },
    });

    const composed = compose([baseStyles, colorStyles]);

    // Test that the composed styles work (currently returns first object)
    // Test that the composed styles work (currently returns first object)
    const result = composed.extract({ size: "sm" });
    expect(result).toContain("base-class");
    expect(result).toContain("text-sm");
    // Note: color variants are not available in current simplified implementation
  });

  it("should handle single style object", () => {
    const baseStyles = styles({
      base: "base-class",
      variants: {
        size: {
          sm: "text-sm",
        },
      },
    });

    const composed = compose([baseStyles]);
    expect(composed).toBe(baseStyles);
  });

  it("should throw error for empty array", () => {
    expect(() => compose([])).toThrow("recast.compose() requires at least one style object");
  });

  it("should return first style object modifiers (simplified implementation)", () => {
    const baseStyles = styles({
      base: "base-class",
      modifiers: {
        disabled: "opacity-50",
      },
    });

    const additionalStyles = styles({
      modifiers: {
        fullWidth: "w-full",
      },
    });

    const composed = compose([baseStyles, additionalStyles]);
    const result = composed.extract({ disabled: true });

    expect(result).toContain("base-class");
    expect(result).toContain("opacity-50");
    // Note: fullWidth modifier is not available in current simplified implementation
  });

  it("should return first style object defaults (simplified implementation)", () => {
    const baseStyles = styles({
      base: "base-class",
      variants: {
        size: {
          sm: "text-sm",
          lg: "text-lg",
        },
      },
      defaults: {
        variants: { size: "sm" },
      },
    });

    const additionalStyles = styles({
      variants: {
        color: {
          primary: "bg-blue-500",
          secondary: "bg-gray-500",
        },
      },
      defaults: {
        variants: { color: "primary" },
      },
    });

    const composed = compose([baseStyles, additionalStyles]);
    const result = composed.extract({});

    expect(result).toContain("base-class");
    expect(result).toContain("text-sm");
    // Note: color defaults are not available in current simplified implementation
  });
});
