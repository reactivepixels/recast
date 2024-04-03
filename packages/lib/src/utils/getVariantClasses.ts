import { RelaxedStyles, RelaxedVariantProps } from "../types.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

import { RECAST_STYLE_PROPS } from "../constants.js";

type Props = {
  styles: RelaxedStyles;
  variants?: RelaxedVariantProps;
};

export const getVariantClasses = ({ styles = {}, variants = {} }: Props) => {
  if (!styles.variants) return RECAST_STYLE_PROPS;

  return Object.keys(variants).reduce((acc, variant) => {
    const variantStyles = styles.variants?.[variant][variants[variant]];

    if (!variantStyles) {
      return acc;
    }

    if (typeof variantStyles === "string" || Array.isArray(variantStyles)) {
      return { classNames: mergeStringClassNames(acc.classNames, variantStyles), rcx: acc.rcx };
    }

    return { classNames: acc.classNames, rcx: mergeObjectClassNames(acc.rcx, variantStyles) };
  }, RECAST_STYLE_PROPS);
};
