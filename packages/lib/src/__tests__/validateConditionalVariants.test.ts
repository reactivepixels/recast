import { describe, it, expect } from "vitest";
import { validateConditionalVariants } from "../utils/validateConditionalVariants.js";
import type { RelaxedCondition, RelaxedVariantProps } from "../types.js";

describe("validateConditionalVariants", () => {
  it("should return true when condition has no variants", () => {
    const condition: RelaxedCondition = {
      className: "test-class",
    };
    const variants: RelaxedVariantProps = {};

    expect(validateConditionalVariants({ condition, variants })).toBe(true);
  });

  it("should validate variants correctly", () => {
    const condition: RelaxedCondition = {
      variants: { size: "lg", color: "blue" },
      className: "test-class",
    };

    // When all variants match
    const matchingVariants: RelaxedVariantProps = { size: "lg", color: "blue" };
    expect(validateConditionalVariants({ condition, variants: matchingVariants })).toBe(true);

    // When some variants match
    const partialMatchingVariants: RelaxedVariantProps = { size: "lg", color: "red" };
    expect(validateConditionalVariants({ condition, variants: partialMatchingVariants })).toBe(false);

    // When no variants match
    const nonMatchingVariants: RelaxedVariantProps = { size: "sm", color: "red" };
    expect(validateConditionalVariants({ condition, variants: nonMatchingVariants })).toBe(false);
  });

  it("should consider default variants", () => {
    const condition: RelaxedCondition = {
      variants: { size: "lg", color: "blue" },
      className: "test-class",
    };

    // When one variant matches and one is in defaults
    const variants: RelaxedVariantProps = { size: "lg" };
    const defaults = { color: "blue" };

    expect(validateConditionalVariants({ condition, variants, defaults })).toBe(true);

    // When all variants are in defaults
    const emptyVariants: RelaxedVariantProps = {};
    const allDefaults = { size: "lg", color: "blue" };

    expect(validateConditionalVariants({ condition, variants: emptyVariants, defaults: allDefaults })).toBe(true);
  });

  it("should handle array condition values", () => {
    const condition: RelaxedCondition = {
      variants: { size: ["lg", "md"] as string[], color: "blue" },
      className: "test-class",
    };

    // When variant matches one of the array values
    const matchingVariants: RelaxedVariantProps = { size: "lg", color: "blue" };
    expect(validateConditionalVariants({ condition, variants: matchingVariants })).toBe(true);

    // When variant matches another of the array values
    const anotherMatchingVariants: RelaxedVariantProps = { size: "md", color: "blue" };
    expect(validateConditionalVariants({ condition, variants: anotherMatchingVariants })).toBe(true);

    // When variant doesn't match any array value
    const nonMatchingVariants: RelaxedVariantProps = { size: "sm", color: "blue" };
    expect(validateConditionalVariants({ condition, variants: nonMatchingVariants })).toBe(false);
  });

  it("should handle complex nested variant objects", () => {
    const condition: RelaxedCondition = {
      variants: { size: "lg" },
      className: "test-class",
    };

    // Test with a complex object value
    const complexVariants = {
      size: { default: "sm", md: "lg" },
    };

    expect(
      validateConditionalVariants({
        condition,
        variants: complexVariants as unknown as RelaxedVariantProps,
      }),
    ).toBe(true);

    // Test with a complex object that doesn't match
    const nonMatchingComplexVariants = {
      size: { default: "sm", md: "md" },
    };

    expect(
      validateConditionalVariants({
        condition,
        variants: nonMatchingComplexVariants as unknown as RelaxedVariantProps,
      }),
    ).toBe(false);
  });

  it("should return false for invalid variant values", () => {
    const condition: RelaxedCondition = {
      variants: { size: "lg" },
      className: "test-class",
    };

    // Test with a non-string, non-object value
    const invalidVariants = {
      size: 123,
    };

    expect(
      validateConditionalVariants({
        condition,
        variants: invalidVariants as unknown as RelaxedVariantProps,
      }),
    ).toBe(false);
  });
});
