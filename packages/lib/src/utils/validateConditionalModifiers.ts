import { RelaxedCondition, RelaxedModifierProps } from "../types.js";
import { isString, isStringArray } from "./common.js";

type ValidateConditionalModifiersProps = {
  condition: RelaxedCondition;
  modifiers: RelaxedModifierProps;
  defaults?: string[];
};

/**
 * Validates if the given condition's modifiers match the current modifiers or defaults.
 *
 * @param {ValidateConditionalModifiersProps} props - The input properties
 * @returns {boolean} True if the condition's modifiers are valid, false otherwise
 */
export const validateConditionalModifiers = ({
  condition,
  modifiers,
  defaults = [],
}: ValidateConditionalModifiersProps): boolean => {
  if (!condition.modifiers) return true;

  const activeModifiers = new Set([
    ...Object.entries(modifiers)
      .filter(([_, value]) => isModifierActive(value))
      .map(([key, _]) => key),
    ...defaults,
  ]);

  if (isString(condition.modifiers)) {
    return activeModifiers.has(condition.modifiers);
  }

  if (isStringArray(condition.modifiers)) {
    return condition.modifiers.every((modifier) => activeModifiers.has(modifier));
  }

  return false;
};

function isModifierActive(value: boolean | { [key: string]: boolean }): boolean {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "object") {
    return Object.values(value).some((v) => v === true);
  }
  return false;
}
