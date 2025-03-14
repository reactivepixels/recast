import { describe, it, expect } from "vitest";
import { validateConditionalModifiers } from "../utils/validateConditionalModifiers.js";
import type { RelaxedCondition, RelaxedModifierProps } from "../types.js";

describe("validateConditionalModifiers additional tests", () => {
  it("should handle complex object modifiers correctly", () => {
    const condition: RelaxedCondition = {
      modifiers: "size",
      className: "test-class",
    };

    // Test with a complex object value that should be considered active
    const complexModifiers: RelaxedModifierProps = {
      size: true,
    };

    expect(validateConditionalModifiers({ condition, modifiers: complexModifiers })).toBe(true);

    // Test with a complex object value that should be considered inactive
    const inactiveComplexModifiers: RelaxedModifierProps = {
      size: false,
    };

    expect(validateConditionalModifiers({ condition, modifiers: inactiveComplexModifiers })).toBe(false);
  });

  it("should handle invalid modifier types", () => {
    const condition: RelaxedCondition = {
      // @ts-expect-error - Testing invalid type
      modifiers: { key: "value" },
      className: "test-class",
    };

    const modifiers: RelaxedModifierProps = {
      key: true,
    };

    // Should return false for invalid modifier types
    expect(validateConditionalModifiers({ condition, modifiers })).toBe(false);
  });

  it("should handle arrays with non-string values", () => {
    const condition: RelaxedCondition = {
      // @ts-expect-error - Testing with non-string values in array
      modifiers: ["active", 123, {}],
      className: "test-class",
    };

    const modifiers: RelaxedModifierProps = {
      active: true,
    };

    // The implementation returns false for arrays with non-string values
    expect(validateConditionalModifiers({ condition, modifiers })).toBe(false);
  });
});
