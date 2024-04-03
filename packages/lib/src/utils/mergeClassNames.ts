import { ClassNameRecord } from "../types.js";

/**
 * Normalizes the given classes by removing leading and trailing whitespace and joining them with a space.
 *
 * @param {string|string[]} classes - The classes to normalize. It can be a single class or an array of classes.
 * @returns {string} The normalized classes.
 */
export const normalizeValue = (classes?: string | string[]) => {
  if (Array.isArray(classes)) return classes.map((x) => x.trim()).join(" ");

  return classes?.trim() || "";
};

/**
 * Merges two values by normalizing them and concatenating them with a space.
 * If only one value is provided, it is normalized and returned.
 *
 * @param {string|string[]} objValue - The first value to merge. It can be a single value or an array of values.
 * @param {string|string[]} value - The second value to merge. It can be a single value or an array of values.
 * @returns {string} The merged and normalized values.
 */
export const mergeStringClassNames = (objValue?: string | string[], value?: string | string[]) => {
  if (objValue && value) {
    return `${normalizeValue(objValue)} ${normalizeValue(value)}`;
  } else if (objValue) {
    return normalizeValue(objValue);
  } else if (value) {
    return normalizeValue(value);
  } else {
    return "";
  }
};

/**
 * Merges class names from a target and source object, normalizing and concatenating them.
 * If a class name exists in both the target and source, they are merged.
 * If a class name exists only in the target or source, it is normalized.
 *
 * @param {ClassNameRecord} target - The target object containing class names.
 * @param {ClassNameRecord} source - The source object containing class names.
 * @returns {ClassNameRecord} The merged class names object.
 */
export const mergeObjectClassNames = (target: ClassNameRecord = {}, source: ClassNameRecord = {}) => {
  /**
   * Normalizes the class names in an object by removing leading and trailing whitespace.
   *
   * @param {ClassNameRecord} x - The object containing class names to normalize.
   * @returns {ClassNameRecord} The object with normalized class names.
   */
  const normalizeTarget = (x: ClassNameRecord): ClassNameRecord => {
    return Object.keys(x).reduce((acc, curr) => {
      return { ...acc, [curr]: normalizeValue(x[curr]) };
    }, {} as ClassNameRecord);
  };

  return Object.entries(source).reduce((acc, [key, value]) => {
    if (acc[key] && value) {
      return { ...acc, [key]: mergeStringClassNames(acc[key], value) };
    } else if (acc[key]) {
      return { ...acc, [key]: normalizeValue(acc[key]) };
    } else if (value) {
      return { ...acc, [key]: normalizeValue(value) };
    }
    return acc;
  }, normalizeTarget(target));
};
