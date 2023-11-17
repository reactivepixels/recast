import { RecastConditionalProps, RecastThemeProps } from "../types.js";

type ValidateConditionProps = {
  variants?: RecastThemeProps["variants"];
  condition: RecastConditionalProps;
  defaults?: Record<string, string>;
};

export const validateConditionalVariants = ({
  condition,
  variants,
  defaults,
}: ValidateConditionProps) => {
  // Get all conditional variant keys
  const conditionalVariantKeys = Object.keys(condition.variants || {});

  // Always return true if variant conditions are empty
  if (!conditionalVariantKeys.length) {
    return true;
  }

  // If component has all specified conditional variant keys
  // check if each of the variant keys includes one of the specified values
  const conditionalVariantMatches = conditionalVariantKeys.filter((x) => {
    const conditionalVariants = condition.variants?.[x];

    if (Array.isArray(conditionalVariants)) {
      // Handle multiple possible variant values if it exists
      if (variants?.[x]) {
        return conditionalVariants.find((j) => j === variants[x]);
      } else {
        // Check defaults
        return conditionalVariants.find((j) => j === defaults?.[x]);
      }
    } else {
      // Handle a single possible value if variant exists
      if (variants?.[x]) {
        return conditionalVariants === variants[x];
      } else {
        // Check defaults
        return conditionalVariants === defaults?.[x];
      }
    }
  });

  return conditionalVariantMatches.length === conditionalVariantKeys.length;
};
