import { Styles } from "./types.js";

/**
 * Theme instance singleton
 * Provides mechanism for components to 'attach'
 * styles to the global theme object
 */
const RecastThemeInstance = (() => {
  let theme: Record<string, Styles> = {};

  const set = <S extends object>(key: string, styles: S) => {
    theme = { ...theme, [key]: { ...styles } };
  };

  const get = (key?: string) => {
    if (key) {
      return theme[key];
    }

    return theme;
  };

  return {
    get,
    set,
  };
})();

export const getTheme = RecastThemeInstance.get;
export const setTheme = RecastThemeInstance.set;

export default RecastThemeInstance;
