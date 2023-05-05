import mergeWith from "lodash.mergewith"
import omit from "lodash.omit"
import { Styles } from "../types"
import { mergeThemeClassNames } from "./mergeThemeClassNames"

type Modifiers = Record<
  string,
  Record<string, string | string[] | Record<string, string | string[]>>
>

type GetModifierClassesProps = {
  theme: Styles
  modifiers?: Modifiers
  prop?: string | string[]
  size?: string
  variant?: string
}

export const getModifierClasses = ({
  theme,
  prop,
  size,
  variant,
  modifiers,
}: GetModifierClassesProps):
  | Omit<
      Record<string, string | string[] | Record<string, string | string[]>>,
      string
    >
  | string => {
  if (!modifiers) return {}

  // Normalize modifier props into array
  const modifierProps: string[] = Array.isArray(prop) ? prop : [prop || ""]
  // Extract size keys
  const sizeKeys = Object.keys(theme?.size || {})
  // Extract variant keys
  const variantKeys = Object.keys(theme?.variant || {})

  return modifierProps.reduce((acc, modifier) => {
    // Get base modifier styles
    const baseModifier = modifier ? modifiers?.[modifier] : {}
    // Get any size based modifiers
    const sizeModifier = size && modifier ? modifiers?.[modifier]?.[size] : {}
    // Get any variant based modifiers
    const variantModifier =
      variant && modifier ? modifiers?.[modifier]?.[variant] : {}

    // Merge all modifier classes together
    return mergeWith(
      acc,
      // Merge base modifier classes with size based modifier classes
      mergeWith(
        omit(baseModifier, sizeKeys, variantKeys),
        sizeModifier,
        variantModifier,
        mergeThemeClassNames
      ),
      mergeThemeClassNames
    )
  }, {})
}
