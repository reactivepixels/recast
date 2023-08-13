/**
 * Determines if the given value is an object
 *
 * @param {unknown} x - The value to check.
 * @returns {boolean} Whether the value is an object and not an array or null.
 */
export const isObject = (x: unknown) =>
  typeof x === "object" && !Array.isArray(x) && x !== null
