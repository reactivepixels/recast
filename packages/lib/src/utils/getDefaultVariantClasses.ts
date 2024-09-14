import { RelaxedStyles, RelaxedVariantProps } from "../types.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses } from "./generateResponsiveClasses.js";

type Props = {
  styles: RelaxedStyles;
  variants?: RelaxedVariantProps;
  breakpoints: string[]; // Add this line
};

export const getDefaultVariantClasses = ({ styles = {}, variants = {} }: Props) => {
  const defaultVariants = styles.defaults?.variants;

  if (!defaultVariants) return RECAST_STYLE_PROPS;

  return Object.keys(defaultVariants).reduce((acc, variant) => {
    const defaultVariantStyles = styles.variants?.[variant]?.[defaultVariants[variant]];

    // Don't continue if no default variant styles are
    // found or a variant has been set
    if (!defaultVariantStyles || variants[variant]) {
      return acc;
    }

    const responsiveClasses = generateResponsiveClasses(defaultVariantStyles);

    return {
      className: mergeStringClassNames(acc.className, responsiveClasses.className),
      rcx: mergeObjectClassNames(acc.rcx, responsiveClasses.rcx),
    };
  }, RECAST_STYLE_PROPS);
};
