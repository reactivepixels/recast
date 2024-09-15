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
