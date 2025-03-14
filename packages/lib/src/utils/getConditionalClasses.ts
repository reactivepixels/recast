import type {
  RelaxedCondition,
  RelaxedModifierProps,
  RelaxedRecastStyleProps,
  RelaxedStyles,
  RelaxedVariantProps,
} from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { formatClassesObject } from "./common.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";
import { validateConditionalModifiers } from "./validateConditionalModifiers.js";
import { validateConditionalVariants } from "./validateConditionalVariants.js";

type GetConditionalClassesProps = {
  styles: RelaxedStyles;
  variants: RelaxedVariantProps;
  modifiers: RelaxedModifierProps;
};

/**
 * Generates conditional classes based on the provided styles, variants, and modifiers.
 *
 * @param {GetConditionalClassesProps} props - The input properties
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and cls properties
 */
export const getConditionalClasses = ({
  styles,
  variants,
  modifiers,
}: GetConditionalClassesProps): RelaxedRecastStyleProps => {
  if (!styles.conditionals || styles.conditionals.length === 0) return RECAST_STYLE_PROPS;

  return styles.conditionals.reduce((acc: RelaxedRecastStyleProps, condition: RelaxedCondition) => {
    const variantsMatch = validateConditionalVariants({
      condition,
      variants,
      defaults: styles.defaults?.variants,
    });

    const modifiersMatch = validateConditionalModifiers({
      condition,
      modifiers,
      defaults: styles.defaults?.modifiers,
    });

    if (variantsMatch && modifiersMatch) {
      const classes = formatClassesObject(condition.className);
      return {
        className: mergeStringClassNames(acc.className, classes.className),
        cls: mergeObjectClassNames(acc.cls, classes.cls),
      };
    }

    return acc;
  }, RECAST_STYLE_PROPS);
};
