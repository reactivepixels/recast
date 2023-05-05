const normalizeValue = (c: string | string[]) => {
  // Iterate through keys and return classes as normalized string
  if (Array.isArray(c)) {
    return c.map((x) => x.trim()).join(" ")
  }

  return c
}

export const mergeThemeClassNames = (
  objValue?: string,
  value?: string | string[]
) => {
  if (objValue && !!objValue?.length && value) {
    return objValue?.concat(` ${normalizeValue(value)}`)
  } else if (value) {
    return normalizeValue(value)
  }

  return
}
