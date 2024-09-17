import { RelaxedStyles, RelaxedRecastStyleProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { isString, isStringArray, isNonNullObject } from "./common.js";

type GetBaseClassesProps = {
  styles: RelaxedStyles;
};

/**
 * Extracts base classes from the provided styles object.
 *
 * @param {GetBaseClassesProps} props - The input properties.
 * @returns {RelaxedRecastStyleProps} An object containing className and rcx properties.
 */
export const getBaseClasses = ({ styles }: GetBaseClassesProps): RelaxedRecastStyleProps => {
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
