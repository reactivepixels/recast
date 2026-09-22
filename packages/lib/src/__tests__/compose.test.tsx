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

  it("should compose nested styles correctly", () => {
    const sliderBaseStyles = styles({
      base: {
        root: "relative flex w-full touch-none select-none items-center",
        track: "relative h-1.5 w-full grow overflow-hidden rounded-full",
        thumb: "block h-4 w-4 rounded-full border-2",
      },
    });

    const sliderColorStyles = styles({
      variants: {
        color: {
          blue: {
            track: "bg-blue-200",
            thumb: "bg-blue-500 border-blue-600",
          },
          red: {
            track: "bg-red-200",
            thumb: "bg-red-500 border-red-600",
          },
        },
      },
    });

    const sliderSizeStyles = styles({
      variants: {
        size: {
          sm: {
            root: "h-4",
            track: "h-1",
            thumb: "h-3 w-3",
          },
          lg: {
            root: "h-6",
            track: "h-2",
            thumb: "h-5 w-5",
          },
        },
      },
    });

    const composed = compose([sliderBaseStyles, sliderColorStyles, sliderSizeStyles]);
    const result = composed.extract({ color: "blue", size: "lg" });

    // Should return nested cls object
    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("root");
    expect(result).toHaveProperty("track");
    expect(result).toHaveProperty("thumb");

    // Cast to ClassNameRecord for proper typing
    const nestedResult = result as Record<string, string>;

    // Verify base classes are included
    expect(nestedResult.root).toContain("relative flex w-full touch-none select-none items-center");
    expect(nestedResult.track).toContain("relative h-1.5 w-full grow overflow-hidden rounded-full");
    expect(nestedResult.thumb).toContain("block h-4 w-4 rounded-full border-2");

    // Verify variant classes are applied
    expect(nestedResult.track).toContain("bg-blue-200");
    expect(nestedResult.thumb).toContain("bg-blue-500 border-blue-600");
    expect(nestedResult.root).toContain("h-6");
    expect(nestedResult.track).toContain("h-2");
    expect(nestedResult.thumb).toContain("h-5 w-5");
  });

  it("should compose nested styles with modifiers correctly", () => {
    const sliderBaseStyles = styles({
      base: {
        root: "relative flex w-full",
        thumb: "block h-4 w-4 rounded-full",
      },
      modifiers: {
        disabled: {
          root: "opacity-50 cursor-not-allowed",
          thumb: "cursor-not-allowed",
        },
      },
    });

    const sliderAdditionalStyles = styles({
      modifiers: {
        loading: {
          thumb: "animate-pulse",
        },
      },
    });

    const composed = compose([sliderBaseStyles, sliderAdditionalStyles]);
    const result = composed.extract({ disabled: true, loading: true });

    expect(typeof result).toBe("object");

    // Cast to ClassNameRecord for proper typing
    const nestedResult = result as Record<string, string>;

    expect(nestedResult.root).toContain("relative flex w-full");
    expect(nestedResult.root).toContain("opacity-50 cursor-not-allowed");
    expect(nestedResult.thumb).toContain("block h-4 w-4 rounded-full");
    expect(nestedResult.thumb).toContain("cursor-not-allowed");
    expect(nestedResult.thumb).toContain("animate-pulse");
  });
});
