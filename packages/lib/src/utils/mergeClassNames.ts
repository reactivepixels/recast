import { isObject } from "./isObject"

export type ClassNameRecord = Record<string, string | string[]>

// Iterate through keys and return classes as normalized string
const normalizeValue = (classes?: string | string[]) => {
  if (Array.isArray(classes)) return classes.map((x) => x.trim()).join(" ")

  return classes
}

const mergeValues = (
  objValue?: string | string[],
  value?: string | string[]
) => {
  if (!!objValue && !!value) {
    return `${normalizeValue(objValue)} ${normalizeValue(value)}`
  } else if (!!objValue) {
    return normalizeValue(objValue) || ""
  } else if (!!value) {
    return normalizeValue(value) || ""
  } else {
    return ""
  }
}

export const mergeClassNames = (
  target: ClassNameRecord,
  source: ClassNameRecord
) => {
  if (!isObject(target) || !isObject(source)) {
    return target
  }

  const result = Object.keys(source).reduce((acc, curr) => {
    // Check if key to be merged already exists
    if (acc[curr] && source[curr]) {
      return { ...acc, [curr]: mergeValues(acc[curr], source[curr]) }
    } else if (acc[curr]) {
      return { ...acc, [curr]: normalizeValue(acc[curr]) || "" }
    } else if (source[curr]) {
      return { ...acc, [curr]: normalizeValue(source[curr]) || "" }
    }

    return acc
  }, target)

  return result
}
