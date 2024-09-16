import { RelaxedCondition, RelaxedVariantProps } from "../types.js";

type ValidateConditionProps = {
  variants?: RelaxedVariantProps;
  condition: RelaxedCondition;
  defaults?: Record<string, string>;
};

/**
 * Validates conditional variants for a given condition object.
 * @param condition - The condition object containing variant keys and their possible values.
 * @param variants - The variants object containing variant keys.
 * @param defaults - The default variant keys.
 * @returns A boolean indicating whether all specified conditional variant keys match.
 */
export const validateConditionalVariants = ({ condition, variants, defaults }: ValidateConditionProps) => {
  const conditionalVariantKeys = Object.keys(condition.variants || {});

  if (!conditionalVariantKeys.length) {
    return true;
  }

  return conditionalVariantKeys.every((key) => {
    const conditionalVariant = condition.variants?.[key];
    const variantValue = variants?.[key] ?? defaults?.[key];

    if (typeof variantValue === "object" && variantValue !== null) {
      // Handle responsive variants
      return Object.entries(variantValue).some(([_breakpoint, value]) => {
        if (Array.isArray(conditionalVariant)) {
          return value !== undefined && conditionalVariant.includes(value);
        }
        return conditionalVariant === value;
      });
    } else {
      // Handle non-responsive variants
      if (Array.isArray(conditionalVariant)) {
        return variantValue !== undefined && conditionalVariant.includes(variantValue);
      }
      return conditionalVariant === variantValue;
    }
  });
};
