import { RelaxedModifierProps, RelaxedStyles } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses } from "./generateResponsiveClasses.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

type Props = {
  styles: RelaxedStyles;
  modifiers?: RelaxedModifierProps;
  breakpoints: string[];
};

export const getDefaultModifierClasses = ({ styles = {}, modifiers = [], breakpoints = [] }: Props) => {
  const defaultModifiers = styles.defaults?.modifiers;

  if (!defaultModifiers) return RECAST_STYLE_PROPS;

  return defaultModifiers.reduce((acc, modifier) => {
    const defaultModifierStyles = styles.modifiers?.[modifier];

    if (!defaultModifierStyles || modifiers.includes(modifier)) {
      return acc;
    }

    const responsiveClasses = generateResponsiveClasses(defaultModifierStyles, breakpoints);

    return {
      className: mergeStringClassNames(acc.className, responsiveClasses.className),
      rcx: mergeObjectClassNames(acc.rcx, responsiveClasses.rcx),
    };
  }, RECAST_STYLE_PROPS);
};
