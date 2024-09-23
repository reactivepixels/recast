import type { RelaxedModifierProps, RelaxedStyles, RelaxedRecastStyleProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses } from "./common.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

type GetModifierClassesProps<B extends string> = {
  styles: RelaxedStyles<B>;
  modifiers: RelaxedModifierProps;
};

/**
 * Generates modifier classes based on the provided styles and modifiers.
 *
 * @param {GetModifierClassesProps} props - The input properties
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and cls properties
 */
export const getModifierClasses = <B extends string>({
  styles,
  modifiers,
}: GetModifierClassesProps<B>): RelaxedRecastStyleProps => {
  if (!styles.modifiers || Object.keys(modifiers).length === 0) return RECAST_STYLE_PROPS;

  return Object.entries(modifiers).reduce<RelaxedRecastStyleProps>((acc, [modifierKey, modifierValue]) => {
    const modifierStyles = styles.modifiers?.[modifierKey];
    if (!modifierStyles) return acc;

    if (modifierValue === true) {
      const classes = generateResponsiveClasses(modifierStyles);
      return {
        className: mergeStringClassNames(acc.className, classes.className),
        cls: mergeObjectClassNames(acc.cls, classes.cls),
      };
    }

    return acc;
  }, RECAST_STYLE_PROPS);
};
