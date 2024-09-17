import { RelaxedStyles, RelaxedVariantProps, ClassNameRecord, RelaxedRecastStyleProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses, isNonNullObject } from "./common.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

type GetVariantClassesProps = {
  styles: RelaxedStyles;
  variants: RelaxedVariantProps;
};

/**
 * Generates variant classes based on the provided styles and variants.
 *
 * @param {GetVariantClassesProps} props - The input properties
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and rcx properties
 */
export const getVariantClasses = ({ styles, variants }: GetVariantClassesProps): RelaxedRecastStyleProps => {
  if (!styles.variants || Object.keys(variants).length === 0) return RECAST_STYLE_PROPS;

  return Object.entries(variants).reduce<RelaxedRecastStyleProps>((acc, [variantKey, variantValue]) => {
    if (typeof variantValue === "string") {
      return processStringVariant(acc, styles, variantKey, variantValue);
    } else if (isNonNullObject(variantValue)) {
      return processResponsiveVariant(acc, styles, variantKey, variantValue);
    }
    return acc;
  }, RECAST_STYLE_PROPS);
};

/**
 * Processes a string variant and generates the corresponding classes.
 */
const processStringVariant = (
  acc: RelaxedRecastStyleProps,
  styles: RelaxedStyles,
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
const processResponsiveVariant = (
  acc: RelaxedRecastStyleProps,
  styles: RelaxedStyles,
  variantKey: string,
  variantValue: Record<string, string>,
): RelaxedRecastStyleProps => {
  const responsiveClasses = Object.entries(variantValue).reduce<RelaxedRecastStyleProps>(
    (innerAcc, [breakpoint, value]) => {
      const variantStyles = styles.variants?.[variantKey]?.[value];
      if (!variantStyles) return innerAcc;

      const breakpointPrefix = breakpoint === "default" ? "" : `${breakpoint}:`;
      const classes = generateResponsiveClasses(variantStyles);

      const prefixedClasses = prefixClasses(classes, breakpointPrefix);

      return {
        className: mergeStringClassNames(innerAcc.className, prefixedClasses.className),
        rcx: mergeObjectClassNames(innerAcc.rcx, prefixedClasses.rcx),
      };
    },
    RECAST_STYLE_PROPS,
  );

  return {
    className: mergeStringClassNames(acc.className, responsiveClasses.className),
    rcx: mergeObjectClassNames(acc.rcx, responsiveClasses.rcx),
  };
};

/**
 * Prefixes classes with the given breakpoint prefix.
 */
const prefixClasses = (classes: RelaxedRecastStyleProps, prefix: string): RelaxedRecastStyleProps => ({
  className: classes.className
    .split(" ")
    .map((cls) => `${prefix}${cls}`)
    .join(" "),
  rcx: Object.entries(classes.rcx).reduce<ClassNameRecord>((rcxAcc, [rcxKey, rcxValue]) => {
    rcxAcc[rcxKey] = (Array.isArray(rcxValue) ? rcxValue : rcxValue.split(" "))
      .map((cls) => `${prefix}${cls}`)
      .join(" ");
    return rcxAcc;
  }, {}),
});
