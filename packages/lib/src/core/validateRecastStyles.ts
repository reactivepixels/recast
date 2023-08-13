import { Modifier, RecastStyles, Size, Variant } from "./types"

/**
 * Utility to validate a components recast styles object shape
 * Useful for externalising styles outside of recast component initialisation i.e. shared server/client styles
 */
export const validateRecastStyles = <BaseTheme>() => {
  return function validate<
    S extends Size<BaseTheme, S>,
    V extends Variant<BaseTheme, V, S>,
    M extends Modifier<BaseTheme, M, S, V>
  >(styles: RecastStyles<BaseTheme, S, V, M>) {
    return styles
  }
}
