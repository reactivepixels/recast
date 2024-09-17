import { RelaxedModifierProps, RelaxedStyles, RelaxedRecastStyleProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses, mergeArrays, isEmptyObject, getDefaultValue } from "./common.js";

type GetDefaultModifierClassesProps = {
  styles: RelaxedStyles;
  modifiers: RelaxedModifierProps;
};

/**
 * Generates default modifier classes based on the provided styles and modifiers.
 *
 * @param {GetDefaultModifierClassesProps} props - The input properties
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and rcx properties
 */
export const getDefaultModifierClasses = ({
  styles,
  modifiers,
}: GetDefaultModifierClassesProps): RelaxedRecastStyleProps => {
  const defaultModifiers = getDefaultValue(styles.defaults?.modifiers, []);

  if (defaultModifiers.length === 0) return RECAST_STYLE_PROPS;

  return defaultModifiers.reduce<RelaxedRecastStyleProps>((acc, modifier) => {
    const defaultModifierStyles = styles.modifiers?.[modifier];

    // Skip if no default modifier styles are found or the modifier is already applied
    if (!defaultModifierStyles || modifiers.includes(modifier)) {
      return acc;
    }

    const responsiveClasses = generateResponsiveClasses(defaultModifierStyles);

    return {
      className: mergeArrays(acc.className.split(" "), responsiveClasses.className.split(" ")).join(" "),
      rcx: isEmptyObject(responsiveClasses.rcx) ? acc.rcx : { ...acc.rcx, ...responsiveClasses.rcx },
    };
  }, RECAST_STYLE_PROPS);
};
