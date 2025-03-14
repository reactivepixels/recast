import type { RelaxedStyles, RelaxedVariantProps, RelaxedRecastStyleProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses } from "./common.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

type GetVariantClassesProps = {
  styles: RelaxedStyles;
  variants: RelaxedVariantProps;
};

/**
 * Generates variant classes based on the provided styles and variants.
 *
 * @param {GetVariantClassesProps} props - The input properties
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and cls properties
 */
export const getVariantClasses = ({ styles, variants }: GetVariantClassesProps): RelaxedRecastStyleProps => {
  if (!styles.variants || Object.keys(variants).length === 0) return RECAST_STYLE_PROPS;

  return Object.entries(variants).reduce<RelaxedRecastStyleProps>((acc, [variantKey, variantValue]) => {
    const variantStyles = styles.variants?.[variantKey]?.[variantValue];
    if (!variantStyles) return acc;

    const responsiveClasses = generateResponsiveClasses(variantStyles);
    return {
      className: mergeStringClassNames(acc.className, responsiveClasses.className),
      cls: mergeObjectClassNames(acc.cls, responsiveClasses.cls),
    };
  }, RECAST_STYLE_PROPS);
};
