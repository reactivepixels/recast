import { RelaxedModifierProps, RelaxedStyles } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses } from "./generateResponsiveClasses.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

type Props = {
  styles: RelaxedStyles;
  modifiers?: RelaxedModifierProps;
  breakpoints: string[];
};

export const getModifierClasses = ({ styles = {}, modifiers = [] }: Props) => {
  if (!styles.modifiers) return RECAST_STYLE_PROPS;

  return modifiers.reduce((acc, modifier) => {
    const modifierStyles = styles.modifiers?.[modifier];

    if (!modifierStyles) {
      return acc;
    }

    const responsiveClasses = generateResponsiveClasses(modifierStyles);

    return {
      className: mergeStringClassNames(acc.className, responsiveClasses.className),
      rcx: mergeObjectClassNames(acc.rcx, responsiveClasses.rcx),
    };
  }, RECAST_STYLE_PROPS);
};
