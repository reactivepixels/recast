import { RecastConditionalProps, RecastThemeProps } from "../types.js";

type ValidateConditionProps = {
  modifiers?: RecastThemeProps["modifiers"];
  condition: RecastConditionalProps;
  defaults?: string[];
};

export const validateConditionalModifiers = ({
  condition,
  modifiers,
  defaults,
}: ValidateConditionProps) => {
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
