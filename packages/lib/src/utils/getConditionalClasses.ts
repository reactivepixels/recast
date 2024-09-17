import { RelaxedModifierProps, RelaxedStyles, RelaxedVariantProps, RelaxedRecastStyleProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses, mergeArrays, isEmptyObject } from "./common.js";
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
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and rcx properties
 */
export const getConditionalClasses = ({
  styles,
  variants,
  modifiers,
}: GetConditionalClassesProps): RelaxedRecastStyleProps => {
  if (!styles.conditionals || styles.conditionals.length === 0) return RECAST_STYLE_PROPS;

  return styles.conditionals.reduce<RelaxedRecastStyleProps>((acc, condition) => {
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

    if (hasConditionalVariants && hasConditionalModifiers) {
      const responsiveClasses = generateResponsiveClasses(condition.className);
      return {
        className: mergeArrays(acc.className.split(" "), responsiveClasses.className.split(" ")).join(" "),
        rcx: isEmptyObject(responsiveClasses.rcx) ? acc.rcx : { ...acc.rcx, ...responsiveClasses.rcx },
      };
    }

    return acc;
  }, RECAST_STYLE_PROPS);
};
