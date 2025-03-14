import { describe, it, expect } from "vitest";
import { validateConditionalModifiers } from "../utils/validateConditionalModifiers.js";
import type { RelaxedCondition, RelaxedModifierProps } from "../types.js";

describe("validateConditionalModifiers", () => {
  it("should return true when condition has no modifiers", () => {
    const condition: RelaxedCondition = {
      className: "test-class",
    };
    const modifiers: RelaxedModifierProps = {};

    expect(validateConditionalModifiers({ condition, modifiers })).toBe(true);
  });

  it("should validate a single string modifier correctly", () => {
    const condition: RelaxedCondition = {
      modifiers: "disabled",
      className: "test-class",
    };

    // When the modifier is active
    const activeModifiers: RelaxedModifierProps = { disabled: true };
    expect(validateConditionalModifiers({ condition, modifiers: activeModifiers })).toBe(true);

    // When the modifier is not active
    const inactiveModifiers: RelaxedModifierProps = { disabled: false };
    expect(validateConditionalModifiers({ condition, modifiers: inactiveModifiers })).toBe(false);

    // When the modifier doesn't exist
    const missingModifiers: RelaxedModifierProps = { active: true };
    expect(validateConditionalModifiers({ condition, modifiers: missingModifiers })).toBe(false);
  });

  it("should validate an array of modifiers correctly", () => {
    const condition: RelaxedCondition = {
      modifiers: ["disabled", "active"],
      className: "test-class",
    };

    // When all modifiers are active
    const allActiveModifiers: RelaxedModifierProps = { disabled: true, active: true };
    expect(validateConditionalModifiers({ condition, modifiers: allActiveModifiers })).toBe(true);

    // When some modifiers are active
    const someActiveModifiers: RelaxedModifierProps = { disabled: true, active: false };
    expect(validateConditionalModifiers({ condition, modifiers: someActiveModifiers })).toBe(false);

    // When no modifiers are active
    const noActiveModifiers: RelaxedModifierProps = { disabled: false, active: false };
    expect(validateConditionalModifiers({ condition, modifiers: noActiveModifiers })).toBe(false);
  });

  it("should consider default modifiers", () => {
    const condition: RelaxedCondition = {
      modifiers: ["disabled", "active"],
      className: "test-class",
    };

    // When one modifier is active and one is in defaults
    const modifiers: RelaxedModifierProps = { disabled: true };
    const defaults = ["active"];

    expect(validateConditionalModifiers({ condition, modifiers, defaults })).toBe(true);

    // When all modifiers are in defaults
    const emptyModifiers: RelaxedModifierProps = {};
    const allDefaults = ["disabled", "active"];

    expect(validateConditionalModifiers({ condition, modifiers: emptyModifiers, defaults: allDefaults })).toBe(true);
  });

  it("should handle complex modifier objects", () => {
    const condition: RelaxedCondition = {
      modifiers: "complex",
      className: "test-class",
    };

    // Test with a complex object value that has at least one true value
    const complexModifiers: RelaxedModifierProps = {
      complex: { state1: true, state2: false } as any,
    };

    expect(validateConditionalModifiers({ condition, modifiers: complexModifiers })).toBe(true);

    // Test with a complex object value that has no true values
    const inactiveComplexModifiers: RelaxedModifierProps = {
      complex: { state1: false, state2: false } as any,
    };

    expect(validateConditionalModifiers({ condition, modifiers: inactiveComplexModifiers })).toBe(false);
  });

  it("should return false for invalid modifier types", () => {
    const condition: RelaxedCondition = {
      modifiers: {} as any, // Invalid type
      className: "test-class",
    };

    const modifiers: RelaxedModifierProps = { disabled: true };

    expect(validateConditionalModifiers({ condition, modifiers })).toBe(false);
  });
});
