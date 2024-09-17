import { RelaxedModifierProps, RelaxedStyles, RelaxedRecastStyleProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses, mergeArrays, isEmptyObject } from "./common.js";

type GetModifierClassesProps = {
  styles: RelaxedStyles;
  modifiers: RelaxedModifierProps;
};

/**
 * Generates modifier classes based on the provided styles and modifiers.
 *
 * @param {GetModifierClassesProps} props - The input properties
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and rcx properties
 */
export const getModifierClasses = ({ styles, modifiers }: GetModifierClassesProps): RelaxedRecastStyleProps => {
  if (!styles.modifiers || modifiers.length === 0) return RECAST_STYLE_PROPS;

  return modifiers.reduce<RelaxedRecastStyleProps>((acc, modifier) => {
    const modifierStyles = styles.modifiers?.[modifier];

    if (!modifierStyles) {
      return acc;
    }

    const responsiveClasses = generateResponsiveClasses(modifierStyles);

    return {
      className: mergeArrays(acc.className.split(" "), responsiveClasses.className.split(" ")).join(" "),
      rcx: isEmptyObject(responsiveClasses.rcx) ? acc.rcx : { ...acc.rcx, ...responsiveClasses.rcx },
    };
  }, RECAST_STYLE_PROPS);
};
