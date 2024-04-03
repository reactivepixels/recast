import { RelaxedModifierProps, RelaxedRecastStyleProps, RelaxedStyles, RelaxedVariantProps } from "../types.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

import { RECAST_STYLE_PROPS } from "../constants.js";
import { getBaseClasses } from "./getBaseClasses.js";
import { getConditionalClasses } from "./getConditionalClasses.js";
import { getDefaultModifierClasses } from "./getDefaultModifierClasses.js";
import { getDefaultVariantClasses } from "./getDefaultVariantClasses.js";
import { getModifierClasses } from "./getModifierClasses.js";
import { getVariantClasses } from "./getVariantClasses.js";

type RecastThemeProps = {
  styles: RelaxedStyles;
  variants?: RelaxedVariantProps;
  modifiers?: RelaxedModifierProps;
};

/**
 * Returns an object containing the CSS classes
 * generated from the provided styles, variants, and modifiers.
 */
export function getRecastClasses({ styles, variants, modifiers }: RecastThemeProps) {
  const baseClasses = getBaseClasses({ styles });
  const variantClasses = getVariantClasses({ styles, variants });
  const defaultVariantClasses = getDefaultVariantClasses({ styles, variants });
  const modifierClasses = getModifierClasses({ styles, modifiers });
  const defaultModifierClasses = getDefaultModifierClasses({ styles, modifiers });
  const conditionalClasses = getConditionalClasses({ styles, variants, modifiers });

  const result = [
    baseClasses,
    variantClasses,
    defaultVariantClasses,
    modifierClasses,
    defaultModifierClasses,
    conditionalClasses,
  ].reduce((acc, curr) => {
    return {
      className: mergeStringClassNames(acc.className, curr.className),
      rcx: mergeObjectClassNames(acc.rcx, curr.rcx),
    };
  }, RECAST_STYLE_PROPS);

  return { className: result.className, rcx: result.rcx } as RelaxedRecastStyleProps;
}
