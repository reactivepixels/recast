// import { isObject } from "./isObject"

// type MergeRecord =
//   | string
//   | string[]
//   | Record<string, string | string[] | Record<string, string | string[]>>

const normalizeValue = (classes: string | string[]) => {
  // Iterate through keys and return classes as normalized string
  if (Array.isArray(classes)) return classes.map((x) => x.trim()).join(" ")

  return classes
}

const mergeValues = (
  objValue?: string | string[],
  value?: string | string[]
) => {
  if (objValue && !!objValue?.length && value) {
    if (Array.isArray(objValue)) {
      return objValue?.concat(normalizeValue(value))
    } else {
      return `${objValue} ${normalizeValue(value)}`
    }
  } else if (value) {
    return normalizeValue(value)
  }

  return ""
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mergeClassNames = (target: any, source: any) => {
  // TODO - clean this up
  if (
    !target ||
    typeof target === "string" ||
    Array.isArray(target) ||
    !source ||
    typeof source === "string" ||
    Array.isArray(source)
  ) {
    return target
  }

  const result = Object.keys(source).reduce((acc, curr) => {
    // Check if key to be merged already exists
    if (acc[curr]) {
      return { ...acc, [curr]: mergeValues(acc[curr], source[curr]) || "" }
    }

    return { ...acc, [curr]: source[curr] }
  }, target)

  return result
}
