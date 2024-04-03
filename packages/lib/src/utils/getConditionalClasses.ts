import { RelaxedModifierProps, RelaxedStyles, RelaxedVariantProps } from "../types.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

import { RECAST_STYLE_PROPS } from "../constants.js";
import { validateConditionalModifiers } from "./validateConditionalModifiers.js";
import { validateConditionalVariants } from "./validateConditionalVariants.js";

type Props = {
  styles: RelaxedStyles;
  variants?: RelaxedVariantProps;
  modifiers?: RelaxedModifierProps;
};

export const getConditionalClasses = ({ styles = {}, variants = {}, modifiers = [] }: Props) => {
  // If no conditions to check then get out of here
  if (!styles.conditionals) return RECAST_STYLE_PROPS;

  const conditionalClasses = styles.conditionals.reduce((acc, condition) => {
    const hasConditionalVariants = validateConditionalVariants({
      condition,
      variants,
      defaults: styles.defaults?.variants,
    });

    const hasConditionalModifiers = validateConditionalModifiers({
      condition,
      modifiers,
      defaults: styles.defaults?.modifiers,
    });

    // Only merge conditional classes if all conditions are met
    if (hasConditionalVariants && hasConditionalModifiers) {
      // return mergeObjectClassNames(acc, condition.classNames);
      if (typeof condition.classNames === "string" || Array.isArray(condition.classNames)) {
        return { classNames: mergeStringClassNames(acc.classNames, condition.classNames), rcx: acc.rcx };
      }

      return { classNames: acc.classNames, rcx: mergeObjectClassNames(acc.rcx, condition.classNames) };
    }

    return acc;
  }, RECAST_STYLE_PROPS);

  return conditionalClasses;
};
