import { mergeClassNames } from "./mergeClassNames.js";
import { RecastThemeProps, Styles } from "../types.js";
import { validateConditionalVariants } from "./validateConditionalVariants.js";
import { validateConditionalModifiers } from "./validateConditionalModifiers.js";

type Props = {
  // Entire component theme
  theme: Styles;
  // Component variant props
  variants?: RecastThemeProps["variants"];
  // Component modifier props
  modifiers?: RecastThemeProps["modifiers"];
};

export const getConditionalClasses = ({
  theme = {},
  variants = {},
  modifiers = [],
}: Props) => {
  // If no conditions to check then get out of here
  if (!theme.conditionals) return {};

  const conditionalClasses = theme.conditionals.reduce((acc, curr) => {
    const hasConditionalVariants = validateConditionalVariants({
      condition: curr,
      variants,
      defaults: theme.defaults?.variants,
    });

    const hasConditionalModifiers = validateConditionalModifiers({
      condition: curr,
      modifiers,
      defaults: theme.defaults?.modifiers,
    });

    // Only merge conditional classes if all conditions are met
    if (hasConditionalVariants && hasConditionalModifiers) {
      return mergeClassNames(acc, curr.classes);
    }

    return acc;
  }, {});

  return conditionalClasses;
};
