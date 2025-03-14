import { describe, it, expect } from "vitest";
import { getConditionalClasses } from "../utils/getConditionalClasses.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import type { RelaxedModifierProps, RelaxedVariantProps, RelaxedStyles } from "../types.js";

describe("getConditionalClasses", () => {
  it("should return RECAST_STYLE_PROPS when no conditionals are provided", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      // No conditionals
    };
    const modifiers: RelaxedModifierProps = {};
    const variants: RelaxedVariantProps = {};

    expect(getConditionalClasses({ styles, modifiers, variants })).toEqual(RECAST_STYLE_PROPS);
  });

  it("should return RECAST_STYLE_PROPS when conditionals array is empty", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      conditionals: [], // Empty array
    };
    const modifiers: RelaxedModifierProps = {};
    const variants: RelaxedVariantProps = {};

    expect(getConditionalClasses({ styles, modifiers, variants })).toEqual(RECAST_STYLE_PROPS);
  });

  it("should apply conditional classes when modifiers match", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      conditionals: [
        {
          modifiers: "active",
          className: "active-condition",
        },
      ],
    };

    const modifiers: RelaxedModifierProps = {
      active: true,
    };

    const variants: RelaxedVariantProps = {};

    const result = getConditionalClasses({ styles, modifiers, variants });

    expect(result.className).toContain("active-condition");
  });

  it("should apply conditional classes when variants match", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      conditionals: [
        {
          variants: { size: "lg" },
          className: "size-lg-condition",
        },
      ],
    };

    const modifiers: RelaxedModifierProps = {};

    const variants: RelaxedVariantProps = {
      size: "lg",
    };

    const result = getConditionalClasses({ styles, modifiers, variants });

    expect(result.className).toContain("size-lg-condition");
  });

  it("should apply conditional classes when both modifiers and variants match", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      conditionals: [
        {
          modifiers: "active",
          variants: { size: "lg" },
          className: "active-size-lg-condition",
        },
      ],
    };

    const modifiers: RelaxedModifierProps = {
      active: true,
    };

    const variants: RelaxedVariantProps = {
      size: "lg",
    };

    const result = getConditionalClasses({ styles, modifiers, variants });

    expect(result.className).toContain("active-size-lg-condition");
  });

  it("should not apply conditional classes when modifiers don't match", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      conditionals: [
        {
          modifiers: "active",
          className: "active-condition",
        },
      ],
    };

    const modifiers: RelaxedModifierProps = {
      active: false, // Doesn't match
    };

    const variants: RelaxedVariantProps = {};

    const result = getConditionalClasses({ styles, modifiers, variants });

    expect(result.className).not.toContain("active-condition");
    expect(result).toEqual(RECAST_STYLE_PROPS);
  });

  it("should not apply conditional classes when variants don't match", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      conditionals: [
        {
          variants: { size: "lg" },
          className: "size-lg-condition",
        },
      ],
    };

    const modifiers: RelaxedModifierProps = {};

    const variants: RelaxedVariantProps = {
      size: "sm", // Doesn't match
    };

    const result = getConditionalClasses({ styles, modifiers, variants });

    expect(result.className).not.toContain("size-lg-condition");
    expect(result).toEqual(RECAST_STYLE_PROPS);
  });

  it("should consider default modifiers when validating conditions", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      conditionals: [
        {
          modifiers: "active",
          className: "active-condition",
        },
      ],
      defaults: {
        modifiers: ["active"], // Default active modifier
      },
    };

    const modifiers: RelaxedModifierProps = {}; // No explicit modifiers

    const variants: RelaxedVariantProps = {};

    const result = getConditionalClasses({ styles, modifiers, variants });

    // Should apply the condition because active is a default modifier
    expect(result.className).toContain("active-condition");
  });

  it("should consider default variants when validating conditions", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      conditionals: [
        {
          variants: { size: "lg" },
          className: "size-lg-condition",
        },
      ],
      defaults: {
        variants: {
          size: "lg", // Default size variant
        },
      },
    };

    const modifiers: RelaxedModifierProps = {};

    const variants: RelaxedVariantProps = {}; // No explicit variants

    const result = getConditionalClasses({ styles, modifiers, variants });

    // Should apply the condition because size is a default variant
    expect(result.className).toContain("size-lg-condition");
  });

  it("should apply multiple matching conditions", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      conditionals: [
        {
          modifiers: "active",
          className: "active-condition",
        },
        {
          variants: { size: "lg" },
          className: "size-lg-condition",
        },
      ],
    };

    const modifiers: RelaxedModifierProps = {
      active: true,
    };

    const variants: RelaxedVariantProps = {
      size: "lg",
    };

    const result = getConditionalClasses({ styles, modifiers, variants });

    // Should apply both conditions
    expect(result.className).toContain("active-condition");
    expect(result.className).toContain("size-lg-condition");
  });
});
