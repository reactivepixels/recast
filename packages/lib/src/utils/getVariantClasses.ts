import type { RelaxedStyles, RelaxedVariantProps, RelaxedRecastStyleProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses, isNonNullObject, isValidBreakpoint, prefixResponsiveClasses } from "./common.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

type GetVariantClassesProps<B extends string> = {
  styles: RelaxedStyles<B>;
  variants: RelaxedVariantProps<B>;
  breakpoints?: B[];
};
/**
 * Generates variant classes based on the provided styles and variants.
 *
 * @param {GetVariantClassesProps} props - The input properties
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and rcx properties
 */
export const getVariantClasses = <B extends string = string>({
  styles,
  variants,
  breakpoints,
}: GetVariantClassesProps<B>): RelaxedRecastStyleProps => {
  if (!styles.variants || Object.keys(variants).length === 0) return RECAST_STYLE_PROPS;

  return Object.entries(variants).reduce<RelaxedRecastStyleProps>((acc, [variantKey, variantValue]) => {
    if (typeof variantValue === "string") {
      return processStringVariant(acc, styles, variantKey, variantValue);
    } else if (isNonNullObject(variantValue)) {
      return processResponsiveVariant(
        acc,
        styles,
        variantKey,
        variantValue as Record<B | "default", string>,
        breakpoints,
      );
    }
    return acc;
  }, RECAST_STYLE_PROPS);
};

/**
 * Processes a string variant and generates the corresponding classes.
 */
const processStringVariant = <B extends string>(
  acc: RelaxedRecastStyleProps,
  styles: RelaxedStyles<B>,
  variantKey: string,
  variantValue: string,
): RelaxedRecastStyleProps => {
  const variantStyles = styles.variants?.[variantKey]?.[variantValue];
  if (!variantStyles) return acc;

  const responsiveClasses = generateResponsiveClasses(variantStyles);
  return {
    className: mergeStringClassNames(acc.className, responsiveClasses.className),
    rcx: mergeObjectClassNames(acc.rcx, responsiveClasses.rcx),
  };
};

/**
 * Processes a responsive variant and generates the corresponding classes with breakpoint prefixes.
 */
const processResponsiveVariant = <B extends string>(
  acc: RelaxedRecastStyleProps,
  styles: RelaxedStyles<B>,
  variantKey: string,
  variantValue: Record<string, string>,
  breakpoints?: B[],
): RelaxedRecastStyleProps => {
  const responsiveClasses = Object.entries(variantValue).reduce<RelaxedRecastStyleProps>(
    (innerAcc, [breakpoint, value]) => {
      if (isValidBreakpoint(breakpoint, breakpoints)) {
        const variantStyles = styles.variants?.[variantKey]?.[value];
        if (variantStyles) {
          const classes = generateResponsiveClasses(variantStyles);
          const breakpointPrefix = breakpoint === "default" ? "" : `${breakpoint}:`;
          const prefixedClasses = prefixResponsiveClasses(classes, breakpointPrefix);

          return {
            className: mergeStringClassNames(innerAcc.className, prefixedClasses.className),
            rcx: mergeObjectClassNames(innerAcc.rcx, prefixedClasses.rcx),
          };
        }
      }
      return innerAcc;
    },
    RECAST_STYLE_PROPS,
  );

  return {
    className: mergeStringClassNames(acc.className, responsiveClasses.className),
    rcx: mergeObjectClassNames(acc.rcx, responsiveClasses.rcx),
  };
};
