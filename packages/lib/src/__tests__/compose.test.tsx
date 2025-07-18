import { describe, it, expect } from "vitest";
import { styles, compose } from "../recast.js";

describe("recast.compose()", () => {
  it("should merge multiple style objects correctly", () => {
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

    // Test that the composed styles work with merged variants
    const result = composed.extract({ size: "sm", color: "primary" });
    expect(result).toContain("base-class");
    expect(result).toContain("text-sm");
    expect(result).toContain("bg-blue-500");
    expect(result).toContain("text-white");
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

  it("should merge modifiers correctly", () => {
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
    const result = composed.extract({ disabled: true, fullWidth: true });

    expect(result).toContain("base-class");
    expect(result).toContain("opacity-50");
    expect(result).toContain("w-full");
  });

  it("should merge defaults correctly", () => {
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
    expect(result).toContain("bg-blue-500");
  });
});
