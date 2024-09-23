import type { ClassNameRecord, RelaxedRecastStyleProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { normalizeClasses, isString, isStringArray } from "./common.js";

/**
 * Generates responsive classes based on the input.
 *
 * @param {string | string[] | ClassNameRecord} classes - The input classes
 * @returns {RelaxedRecastStyleProps} An object containing className and cls properties
 */
export const generateResponsiveClasses = (classes: string | string[] | ClassNameRecord): RelaxedRecastStyleProps => {
  if (!classes) return RECAST_STYLE_PROPS;

  if (isString(classes) || isStringArray(classes)) {
    return { className: normalizeClasses(classes), cls: {} };
  }

  const cls: ClassNameRecord = Object.entries(classes).reduce((acc, [key, value]) => {
    acc[key] = normalizeClasses(value);
    return acc;
  }, {} as ClassNameRecord);

  return { className: "", cls };
};
