import type { RelaxedModifierProps, RelaxedStyles, RelaxedRecastStyleProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { mergeArrays, getDefaultValue } from "./common.js";

type GetDefaultModifierClassesProps<B extends string> = {
  styles: RelaxedStyles<B>;
  modifiers: RelaxedModifierProps;
};

/**
 * Generates default modifier classes based on the provided styles and modifiers.
 *
 * @template B - String literal type for breakpoints
 * @param {GetDefaultModifierClassesProps<B>} props - The input properties
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and cls properties
 */
export const getDefaultModifierClasses = <B extends string>({
  styles,
  modifiers,
}: GetDefaultModifierClassesProps<B>): RelaxedRecastStyleProps => {
  const defaultModifiers = getDefaultValue(styles.defaults?.modifiers, []);

  if (defaultModifiers.length === 0) return RECAST_STYLE_PROPS;

  return defaultModifiers.reduce<RelaxedRecastStyleProps>((acc, modifier) => {
    const defaultModifierStyles = styles.modifiers?.[modifier];

    // Skip if no default modifier styles are found or the modifier is already applied
    if (!defaultModifierStyles || isModifierApplied(modifiers[modifier])) {
      return acc;
    }

    // Handle defaultModifierStyles as a string or array of strings
    const classesArray = Array.isArray(defaultModifierStyles) ? defaultModifierStyles : [defaultModifierStyles];

    return {
      className: mergeArrays(acc.className.split(" "), classesArray).join(" "),
      cls: acc.cls,
    };
  }, RECAST_STYLE_PROPS);
};

function isModifierApplied(value: boolean | undefined): boolean {
  return value === true;
}
