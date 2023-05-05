import { Styles } from "./types"

/**
 * Theme instance singleton
 * Provides mechanism for components to 'attach'
 * styles to the global theme object
 */
const SVMThemeInstance = (() => {
  let theme: Record<string, Styles> = {}

  const set = <S extends object>(key: string, styles: S) => {
    theme = { ...theme, [key]: { ...styles } }
  }

  const get = () => {
    return theme
  }

  return {
    get,
    set,
  }
})()

export const getTheme = SVMThemeInstance.get
export const setTheme = SVMThemeInstance.set

export default SVMThemeInstance
