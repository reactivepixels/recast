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

  const allModifiers = new Set([...modifiers, ...defaults]);

  if (isString(condition.modifiers)) {
    return allModifiers.has(condition.modifiers);
  }

  if (isStringArray(condition.modifiers)) {
    return condition.modifiers.every((modifier) => allModifiers.has(modifier));
  }

  return false;
};
