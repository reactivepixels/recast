import type { RelaxedModifierProps, RelaxedRecastStyleProps, RelaxedStyles } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { formatClassesObject } from "./common.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

type GetModifierClassesProps = {
  styles: RelaxedStyles;
  modifiers: RelaxedModifierProps;
};

/**
 * Generates modifier classes based on the provided styles and modifiers.
 *
 * @param {GetModifierClassesProps} props - The input properties
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and cls properties
 */
export const getModifierClasses = ({ styles, modifiers }: GetModifierClassesProps): RelaxedRecastStyleProps => {
  if (!styles.modifiers || Object.keys(modifiers).length === 0) return RECAST_STYLE_PROPS;

  return Object.entries(modifiers).reduce((acc: RelaxedRecastStyleProps, [modifierKey, isActive]) => {
    if (!isActive) return acc;

    const modifierStyles = styles.modifiers?.[modifierKey];
    if (!modifierStyles) return acc;

    const classes = formatClassesObject(modifierStyles);
    return {
      className: mergeStringClassNames(acc.className, classes.className),
      cls: mergeObjectClassNames(acc.cls, classes.cls),
    };
  }, RECAST_STYLE_PROPS);
};
