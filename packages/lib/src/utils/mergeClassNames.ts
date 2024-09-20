import type { ClassNameRecord } from "../types.js";
import { normalizeClasses, mergeArrays } from "./common.js";

/**
 * Merges two values by normalizing them and concatenating them with a space.
 * If only one value is provided, it is normalized and returned.
 *
 * @param objValue - The first value to merge. It can be a single value, an array of values, or undefined.
 * @param value - The second value to merge. It can be a single value, an array of values, or undefined.
 * @returns The merged and normalized values as a string.
 * @example
 * mergeStringClassNames("btn", "btn-primary") // returns "btn btn-primary"
 * mergeStringClassNames(["btn", "btn-lg"], "btn-primary") // returns "btn btn-lg btn-primary"
 */
export const mergeStringClassNames = (objValue?: string | string[], value?: string | string[]): string => {
  const normalized = mergeArrays(normalizeClasses(objValue).split(" "), normalizeClasses(value).split(" "));
  return normalized.filter(Boolean).join(" ");
};

/**
 * Merges class names from a target and source object, normalizing and concatenating them.
 *
 * @param target - The target object containing class names.
 * @param source - The source object containing class names.
 * @returns The merged class names object.
 * @example
 * mergeObjectClassNames(
 *   { btn: "btn-lg", color: "text-primary" },
 *   { btn: "btn-sm", background: "bg-dark" }
 * )
 * // returns { btn: "btn-lg btn-sm", color: "text-primary", background: "bg-dark" }
 */
export const mergeObjectClassNames = (target: ClassNameRecord = {}, source: ClassNameRecord = {}): ClassNameRecord => {
  return Object.entries(source).reduce(
    (acc, [key, value]) => {
      acc[key] = mergeStringClassNames(acc[key], value);
      return acc;
    },
    { ...target },
  );
};
