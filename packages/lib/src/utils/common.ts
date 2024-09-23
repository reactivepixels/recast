import { RECAST_STYLE_PROPS } from "../constants.js";
import type { ClassNameRecord, RelaxedRecastStyleProps } from "../types.js";

/**
 * Checks if the given value is a string.
 * @param value - The value to check.
 * @returns True if the value is a string, false otherwise.
 */
export const isString = (value: unknown): value is string => typeof value === "string";

/**
 * Checks if the given value is an array of strings.
 * @param value - The value to check.
 * @returns True if the value is an array of strings, false otherwise.
 */
export const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => isString(item) || item === undefined || item === null);

/**
 * Checks if the given value is a non-null object.
 * @param value - The value to check.
 * @returns True if the value is a non-null object, false otherwise.
 */
export const isNonNullObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/**
 * Normalizes the given classes by removing leading and trailing whitespace and joining them with a space.
 * @param classes - The classes to normalize. It can be a single class, an array of classes, or undefined.
 * @returns The normalized classes as a string.
 * @throws Error if the input type is invalid.
 */
export const normalizeClasses = (classes?: string | string[]): string => {
  if (!classes) return "";
  if (isStringArray(classes)) {
    return classes
      .filter(Boolean)
      .map((x) => x.trim())
      .join(" ");
  }
  if (isString(classes)) {
    return classes.trim();
  }
  throw new Error("Invalid input type for normalizeClasses");
};

/**
 * Generates responsive classes based on the input.
 * @param classes - The input classes.
 * @returns An object containing className and cls properties.
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

/**
 * Checks if a variant value matches the condition value.
 * @param conditionValue - The value or values specified in the condition.
 * @param variantValue - The current variant value.
 * @returns True if there's a match, false otherwise.
 */
export const isVariantMatch = (conditionValue: string | string[], variantValue: string): boolean => {
  return Array.isArray(conditionValue) ? conditionValue.includes(variantValue) : conditionValue === variantValue;
};

/**
 * Safely accesses a nested property of an object.
 * @param obj - The object to access.
 * @param path - The path to the property, as an array of keys.
 * @returns The value at the path, or undefined if not found.
 */
type NestedObject = { [key: string]: NestedObject | unknown };

export const safeObjectAccess = <T, O extends NestedObject>(obj: O, path: string[]): T | undefined => {
  return path.reduce<unknown>(
    (acc: unknown, key: string) => (acc && typeof acc === "object" ? (acc as NestedObject)[key] : undefined),
    obj,
  ) as T | undefined;
};

/**
 * Returns the provided value if it's defined, otherwise returns the default value.
 * @param value - The value to check.
 * @param defaultValue - The default value to return if the first value is undefined.
 * @returns The value if defined, otherwise the default value.
 */
export const getDefaultValue = <T>(value: T | undefined, defaultValue: T): T => {
  return value !== undefined ? value : defaultValue;
};

/**
 * Merges multiple arrays, filtering out undefined values.
 * @param arrays - The arrays to merge.
 * @returns A new array containing all elements from the input arrays.
 */
export const mergeArrays = <T>(...arrays: (T[] | undefined)[]): T[] => {
  return arrays.reduce<T[]>((acc, arr) => [...acc, ...(arr ?? [])], []);
};

/**
 * Checks if an object is empty (has no own properties).
 * @param obj - The object to check.
 * @returns True if the object is empty, false otherwise.
 */
export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length === 0;
};

/**
 * Creates a memoized version of the provided function.
 * The function's results are cached based on the stringified version of its arguments.
 *
 * @template TArgs - The tuple type representing the argument types of the function
 * @template TReturn - The return type of the function
 * @param {(...args: TArgs) => TReturn} fn - The function to memoize
 * @returns {(...args: TArgs) => TReturn} A memoized version of the input function
 *
 * @example
 * const expensiveCalculation = memoize((a: number, b: number): number => {
 *   // Some expensive operation
 *   return a + b;
 * });
 */
export function memoize<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
): (...args: TArgs) => TReturn {
  const cache = new Map<string, TReturn>();

  return (...args: TArgs): TReturn => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

/**
 * Omits specified keys from an object and returns a new object.
 *
 * @param {string[]} keysToOmit - An array of keys to be omitted from the object.
 * @param {Record<string, string | string[] | Record<string, string | string[]>>} originalObject - The original object to omit keys from.
 * @returns {Record<string, string | string[] | Record<string, string | string[]>>} A new object with the specified keys omitted.
 */
export const omit = (
  keysToOmit: string[] = [],
  originalObject: Record<string, string | string[] | Record<string, string | string[]>> = {},
) => {
  const clonedObject = { ...originalObject };

  for (const path of keysToOmit) {
    delete clonedObject[path];
  }

  return clonedObject;
};

/**
 * Checks if a given breakpoint is valid within the context of provided breakpoints.
 *
 * This function serves as a type guard, narrowing the type of `breakpoint` to either `B` or "default"
 * if it's valid. It considers a breakpoint valid if:
 * 1. It's the string "default", which is always considered valid.
 * 2. It's included in the provided array of breakpoints.
 * 3. No breakpoints are provided (in which case all strings are considered valid).
 *
 * @template B - A string type representing valid breakpoint names.
 * @param {string} breakpoint - The breakpoint to validate.
 * @param {B[]} [breakpoints] - An optional array of valid breakpoints.
 * @returns {breakpoint is B | "default"} - A type predicate indicating if the breakpoint is valid.
 *
 * @example
 * const breakpoints = ['sm', 'md', 'lg'] as const;
 * type Breakpoints = typeof breakpoints[number];
 *
 * console.log(isValidBreakpoint('sm', breakpoints)); // true
 * console.log(isValidBreakpoint('xl', breakpoints)); // false
 * console.log(isValidBreakpoint('default', breakpoints)); // true
 * console.log(isValidBreakpoint('any', undefined)); // true
 */
export function isValidBreakpoint<B extends string>(
  breakpoint: string,
  breakpoints?: B[],
): breakpoint is B | "default" {
  return breakpoint === "default" || (breakpoints ? breakpoints.includes(breakpoint as B) : true);
}

/**
 * Prefixes all classes in a RelaxedRecastStyleProps object with a given prefix.
 *
 * This function is useful for adding breakpoint prefixes to classes in responsive designs.
 * It handles both the `className` string and the `cls` object, ensuring all classes are prefixed.
 *
 * @param {RelaxedRecastStyleProps} classes - The original classes object to be prefixed.
 * @param {string} prefix - The prefix to be added to each class.
 * @returns {RelaxedRecastStyleProps} A new RelaxedRecastStyleProps object with all classes prefixed.
 *
 * @example
 * const original = {
 *   className: "text-red-500 bg-blue-300",
 *   cls: { hover: "text-blue-500", focus: ["outline-none", "ring-2"] }
 * };
 * const prefixed = prefixClasses(original, "md:");
 * // Result:
 * // {
 * //   className: "md:text-red-500 md:bg-blue-300",
 * //   cls: { hover: "md:text-blue-500", focus: "md:outline-none md:ring-2" }
 * // }
 */
export const prefixResponsiveClasses = (classes: RelaxedRecastStyleProps, prefix: string): RelaxedRecastStyleProps => ({
  className: classes.className
    .split(" ")
    .map((cls) => `${prefix}${cls}`)
    .join(" "),
  cls: Object.entries(classes.cls).reduce<ClassNameRecord>((clsAcc, [clsKey, clsValue]) => {
    clsAcc[clsKey] = (Array.isArray(clsValue) ? clsValue : clsValue.split(" "))
      .map((cls) => `${prefix}${cls}`)
      .join(" ");
    return clsAcc;
  }, {}),
});
