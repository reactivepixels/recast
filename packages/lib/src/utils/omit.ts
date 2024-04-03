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
