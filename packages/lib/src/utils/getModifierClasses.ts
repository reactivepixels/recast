import { RelaxedModifierProps, RelaxedStyles } from "../types.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

import { RECAST_STYLE_PROPS } from "../constants.js";

type Props = {
  styles: RelaxedStyles;
  modifiers?: RelaxedModifierProps;
};

export const getModifierClasses = ({ styles = {}, modifiers = [] }: Props) => {
  if (!styles.modifiers) return RECAST_STYLE_PROPS;

  return modifiers.reduce((acc, modifier) => {
    const modifierStyles = styles.modifiers?.[modifier];

    if (!modifierStyles) {
      return acc;
    }

    if (typeof modifierStyles === "string" || Array.isArray(modifierStyles)) {
      return { className: mergeStringClassNames(acc.className, modifierStyles), rcx: acc.rcx };
    }

    return { className: acc.className, rcx: mergeObjectClassNames(acc.rcx, modifierStyles) };
  }, RECAST_STYLE_PROPS);
};
