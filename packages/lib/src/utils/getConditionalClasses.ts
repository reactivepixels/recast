import type { RelaxedModifierProps, RelaxedStyles, RelaxedVariantProps, RelaxedRecastStyleProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses, mergeArrays, isEmptyObject } from "./common.js";
import { validateConditionalModifiers } from "./validateConditionalModifiers.js";
import { validateConditionalVariants } from "./validateConditionalVariants.js";

type GetConditionalClassesProps<B extends string> = {
  styles: RelaxedStyles<B>;
  variants: RelaxedVariantProps<B>;
  modifiers: RelaxedModifierProps;
};

/**
 * Generates conditional classes based on the provided styles, variants, and modifiers.
 *
 * @template B - String literal type for breakpoints
 * @param {GetConditionalClassesProps<B>} props - The input properties
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and cls properties
 */
export const getConditionalClasses = <B extends string>({
  styles,
  variants,
  modifiers,
}: GetConditionalClassesProps<B>): RelaxedRecastStyleProps => {
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
        cls: isEmptyObject(responsiveClasses.cls) ? acc.cls : { ...acc.cls, ...responsiveClasses.cls },
      };
    }

    return acc;
  }, RECAST_STYLE_PROPS);
};
