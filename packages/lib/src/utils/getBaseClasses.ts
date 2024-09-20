import type { RelaxedStyles, RelaxedRecastStyleProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { isString, isStringArray, isNonNullObject } from "./common.js";

type GetBaseClassesProps<B extends string> = {
  styles: RelaxedStyles<B>;
};

/**
 * Extracts base classes from the provided styles object.
 *
 * @template B - String literal type for breakpoints
 * @param {GetBaseClassesProps<B>} props - The input properties.
 * @returns {RelaxedRecastStyleProps} An object containing className and rcx properties.
 */
export const getBaseClasses = <B extends string>({ styles }: GetBaseClassesProps<B>): RelaxedRecastStyleProps => {
  if (!styles?.base) {
    return RECAST_STYLE_PROPS;
  }

  const { base } = styles;

  if (isString(base)) {
    return { className: base.trim(), rcx: {} };
  }

  if (isStringArray(base)) {
    return { className: base.filter(Boolean).join(" ").trim(), rcx: {} };
  }

  if (isNonNullObject(base)) {
    return { className: "", rcx: base };
  }

  // Handle unexpected input
  console.warn("Unexpected type for styles.base:", typeof base);
  return RECAST_STYLE_PROPS;
};
