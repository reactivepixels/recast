import type { RelaxedStyles, RelaxedVariantProps, RelaxedRecastStyleProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses, mergeArrays, isEmptyObject } from "./common.js";

type GetDefaultVariantClassesProps<B extends string = string> = {
  styles: RelaxedStyles<B>;
  variants: RelaxedVariantProps<B>;
};

/**
 * Generates default variant classes based on the provided styles and variants.
 *
 * @param {GetDefaultVariantClassesProps} props - The input properties
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and rcx properties
 */
export const getDefaultVariantClasses = <B extends string>({
  styles,
  variants,
}: GetDefaultVariantClassesProps<B>): RelaxedRecastStyleProps => {
  const defaultVariants = styles.defaults?.variants;

  if (!defaultVariants) return RECAST_STYLE_PROPS;

  return Object.entries(defaultVariants).reduce<RelaxedRecastStyleProps>((acc, [variant, defaultValue]) => {
    const defaultVariantStyles = styles.variants?.[variant]?.[defaultValue];

    // Skip if no default variant styles are found or a variant has been set
    if (!defaultVariantStyles || variants[variant]) {
      return acc;
    }

    const responsiveClasses = generateResponsiveClasses(defaultVariantStyles);

    return {
      className: mergeArrays(acc.className.split(" "), responsiveClasses.className.split(" ")).join(" "),
      rcx: isEmptyObject(responsiveClasses.rcx) ? acc.rcx : { ...acc.rcx, ...responsiveClasses.rcx },
    };
  }, RECAST_STYLE_PROPS);
};
