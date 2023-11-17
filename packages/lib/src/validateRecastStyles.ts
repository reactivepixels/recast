import { Modifiers, RecastStyles, Variants } from "./types.js";

/**
 * Utility to validate a components recast styles object shape
 * Useful for externalising styles outside of recast component initialisation i.e. shared server/client styles
 */
export const validateRecastStyles = <BaseTheme>() => {
  return function validate<
    V extends Variants<BaseTheme, V>,
    M extends Modifiers<BaseTheme, M>,
  >(styles: RecastStyles<BaseTheme, V, M>) {
    return styles;
  };
};
