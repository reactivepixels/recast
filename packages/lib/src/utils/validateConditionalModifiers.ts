import { RelaxedCondition, RelaxedModifierProps } from "../types.js";

type ValidateConditionProps = {
  modifiers?: RelaxedModifierProps;
  condition: RelaxedCondition;
  defaults?: string[];
};

/**
 * Validates if the given modifiers match the condition.
 * @param condition - The condition to match against.
 * @param modifiers - The modifiers to validate.
 * @param defaults - The default values to validate.
 * @returns A boolean indicating whether all specified conditional modifier keys match.
 */
export const validateConditionalModifiers = ({ condition, modifiers, defaults }: ValidateConditionProps) => {
  // Always return true if modifier conditions are empty
  if (!condition.modifiers?.length) {
    return true;
  }

  // Handle multiple possible modifier values
  if (Array.isArray(condition.modifiers)) {
    const conditionalModifierMatches = condition.modifiers.filter((x) => {
      if (modifiers?.includes(x)) {
        return true;
      }

      return defaults?.includes(x);
    });

    // All modifiers must be matched
    return conditionalModifierMatches.length === condition.modifiers.length;
  } else {
    // Handle a single possible value
    if (modifiers?.includes(condition.modifiers)) {
      return true;
    }

    return defaults?.includes(condition.modifiers);
  }
};
