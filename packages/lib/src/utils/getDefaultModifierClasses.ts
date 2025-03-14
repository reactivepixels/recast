import type { RelaxedModifierProps, RelaxedRecastStyleProps, RelaxedStyles } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses } from "./common.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

type GetDefaultModifierClassesProps = {
  styles: RelaxedStyles;
  modifiers: RelaxedModifierProps;
};

/**
 * Generates default modifier classes based on the provided styles and modifiers.
 *
 * @param {GetDefaultModifierClassesProps} props - The input properties
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and cls properties
 */
export const getDefaultModifierClasses = ({
  styles,
  modifiers,
}: GetDefaultModifierClassesProps): RelaxedRecastStyleProps => {
  if (!styles.defaults?.modifiers || styles.defaults.modifiers.length === 0) {
    return RECAST_STYLE_PROPS;
  }

  return styles.defaults.modifiers.reduce((acc: RelaxedRecastStyleProps, modifier: string) => {
    // Skip if the modifier is explicitly set to false
    if (modifiers[modifier] === false) {
      return acc;
    }

    // Skip if the modifier is already explicitly set to true
    if (modifiers[modifier] === true) {
      return acc;
    }

    const modifierStyles = styles.modifiers?.[modifier];
    if (!modifierStyles) {
      return acc;
    }

    const classes = generateResponsiveClasses(modifierStyles);
    return {
      className: mergeStringClassNames(acc.className, classes.className),
      cls: mergeObjectClassNames(acc.cls, classes.cls),
    };
  }, RECAST_STYLE_PROPS);
};
