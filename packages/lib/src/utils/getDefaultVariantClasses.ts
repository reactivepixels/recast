import type { RelaxedRecastStyleProps, RelaxedStyles, RelaxedVariantProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses } from "./common.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

type GetDefaultVariantClassesProps = {
  styles: RelaxedStyles;
  variants: RelaxedVariantProps;
};

/**
 * Generates default variant classes based on the provided styles and variants.
 *
 * @param {GetDefaultVariantClassesProps} props - The input properties
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and cls properties
 */
export const getDefaultVariantClasses = ({
  styles,
  variants,
}: GetDefaultVariantClassesProps): RelaxedRecastStyleProps => {
  if (!styles.defaults?.variants) return RECAST_STYLE_PROPS;

  return Object.entries(styles.defaults.variants).reduce((acc: RelaxedRecastStyleProps, [variantKey, variantValue]) => {
    // Skip if the variant is already explicitly set
    if (variants[variantKey]) {
      return acc;
    }

    const variantStyles = styles.variants?.[variantKey]?.[variantValue];
    if (!variantStyles) {
      return acc;
    }

    const classes = generateResponsiveClasses(variantStyles);
    return {
      className: mergeStringClassNames(acc.className, classes.className),
      cls: mergeObjectClassNames(acc.cls, classes.cls),
    };
  }, RECAST_STYLE_PROPS);
};
