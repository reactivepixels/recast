type GetSizeClassesProps = {
  sizes?: Record<string, Record<string, string | string[]>>
  prop?: string
  fallback?: string
}

export const getSizeClasses = ({
  prop,
  sizes,
  fallback,
}: GetSizeClassesProps): Record<string, string> | Record<string, unknown> => {
  if (!sizes) return {}
  return prop ? sizes?.[prop] : fallback ? sizes?.[fallback] : {}
}
