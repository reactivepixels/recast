import { RelaxedModifierProps, RelaxedStyles } from "../types.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

import { RECAST_STYLE_PROPS } from "../constants.js";

type Props = {
  styles: RelaxedStyles;
  modifiers?: RelaxedModifierProps;
};

export const getDefaultModifierClasses = ({ styles = {}, modifiers = [] }: Props) => {
  const defaultModifiers = styles.defaults?.modifiers;

  if (!defaultModifiers) return RECAST_STYLE_PROPS;

  return defaultModifiers.reduce((acc, modifier) => {
    const defaultModifierStyles = styles.modifiers?.[modifier];

    if (!defaultModifierStyles || modifiers.includes(modifier)) {
      return acc;
    }

    if (typeof defaultModifierStyles === "string" || Array.isArray(defaultModifierStyles)) {
      return { className: mergeStringClassNames(acc.className, defaultModifierStyles), rcx: acc.rcx };
    }

    return { className: acc.className, rcx: mergeObjectClassNames(acc.rcx, defaultModifierStyles) };
  }, RECAST_STYLE_PROPS);
};
