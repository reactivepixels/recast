import { describe, it, expect } from "vitest";
import { getDefaultVariantClasses } from "../utils/getDefaultVariantClasses.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import type { RelaxedVariantProps, RelaxedStyles } from "../types.js";

describe("getDefaultVariantClasses", () => {
  it("should return RECAST_STYLE_PROPS when no default variants are provided", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      variants: {
        size: {
          sm: "size-sm",
          md: "size-md",
        },
      },
      // No defaults
    };
    const variants: RelaxedVariantProps = {};

    expect(getDefaultVariantClasses({ styles, variants })).toEqual(RECAST_STYLE_PROPS);
  });

  it("should return RECAST_STYLE_PROPS when defaults object is empty", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      variants: {
        size: {
          sm: "size-sm",
          md: "size-md",
        },
      },
      defaults: {}, // Empty defaults object
    };
    const variants: RelaxedVariantProps = {};

    expect(getDefaultVariantClasses({ styles, variants })).toEqual(RECAST_STYLE_PROPS);
  });

  it("should skip variants that are already set in the variants object", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      variants: {
        size: {
          sm: "size-sm",
          md: "size-md",
          lg: "size-lg",
        },
        color: {
          red: "color-red",
          blue: "color-blue",
        },
      },
      defaults: {
        variants: {
          size: "md",
          color: "blue",
        },
      },
    };
    const variants: RelaxedVariantProps = {
      size: "sm", // This overrides the default "md"
    };

    const result = getDefaultVariantClasses({ styles, variants });

    // Should only include color-blue, not size-md (since size is explicitly set to "sm")
    expect(result.className).toContain("color-blue");
    expect(result.className).not.toContain("size-md");
  });

  it("should skip variants that don't exist in styles.variants", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      variants: {
        size: {
          sm: "size-sm",
          md: "size-md",
        },
        // No color variant
      },
      defaults: {
        variants: {
          size: "md",
          color: "blue", // This doesn't exist in variants
        },
      },
    };
    const variants: RelaxedVariantProps = {};

    const result = getDefaultVariantClasses({ styles, variants });

    // Should only include size-md
    expect(result.className).toContain("size-md");
    expect(result.className.split(" ").length).toBe(1); // Only one class
  });

  it("should skip variant values that don't exist in the variant object", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      variants: {
        size: {
          sm: "size-sm",
          md: "size-md",
          // No lg size
        },
      },
      defaults: {
        variants: {
          size: "lg", // This value doesn't exist
        },
      },
    };
    const variants: RelaxedVariantProps = {};

    const result = getDefaultVariantClasses({ styles, variants });

    // Should not include any classes
    expect(result.className).toBe("");
  });

  it("should merge multiple default variants correctly", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      variants: {
        size: {
          sm: "size-sm",
          md: "size-md",
          lg: "size-lg",
        },
        color: {
          red: "color-red",
          blue: "color-blue",
        },
        rounded: {
          true: "rounded",
        },
      },
      defaults: {
        variants: {
          size: "md",
          color: "blue",
          rounded: "true",
        },
      },
    };
    const variants: RelaxedVariantProps = {};

    const result = getDefaultVariantClasses({ styles, variants });

    // Should include all default variant classes
    expect(result.className).toContain("size-md");
    expect(result.className).toContain("color-blue");
    expect(result.className).toContain("rounded");
  });
});
