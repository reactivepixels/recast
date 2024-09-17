import { RelaxedCondition, RelaxedVariantProps } from "../types.js";
import { isNonNullObject, isVariantMatch, safeObjectAccess } from "./common.js";

type ValidateConditionalVariantsProps = {
  condition: RelaxedCondition;
  variants: RelaxedVariantProps;
  defaults?: Record<string, string>;
};

/**
 * Validates if the given condition's variants match the current variants or defaults.
 *
 * @param {ValidateConditionalVariantsProps} props - The input properties
 * @returns {boolean} True if the condition's variants are valid, false otherwise
 */
export const validateConditionalVariants = ({
  condition,
  variants,
  defaults = {},
}: ValidateConditionalVariantsProps): boolean => {
  if (!condition.variants) return true;

  return Object.entries(condition.variants).every(([variantKey, conditionValue]) => {
    const currentVariant =
      safeObjectAccess<string, RelaxedVariantProps>(variants, [variantKey]) ?? defaults[variantKey];

    if (typeof currentVariant === "string") {
      return isVariantMatch(conditionValue, currentVariant);
    }

    if (isNonNullObject(currentVariant)) {
      return Object.values(currentVariant).some((breakpointValue) =>
        isVariantMatch(conditionValue, breakpointValue as string),
      );
    }

    return false;
  });
};
