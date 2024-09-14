import { RelaxedModifierProps, RelaxedStyles, RelaxedVariantProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses } from "./generateResponsiveClasses.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";
import { validateConditionalModifiers } from "./validateConditionalModifiers.js";
import { validateConditionalVariants } from "./validateConditionalVariants.js";

type Props = {
  styles: RelaxedStyles;
  variants?: RelaxedVariantProps;
  modifiers?: RelaxedModifierProps;
  breakpoints: string[];
};

export const getConditionalClasses = ({ styles = {}, variants = {}, modifiers = [] }: Props) => {
  if (!styles.conditionals) return RECAST_STYLE_PROPS;

  return styles.conditionals.reduce((acc, condition) => {
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
        className: mergeStringClassNames(acc.className, responsiveClasses.className),
        rcx: mergeObjectClassNames(acc.rcx, responsiveClasses.rcx),
      };
    }

    return acc;
  }, RECAST_STYLE_PROPS);
};
