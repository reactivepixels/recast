import type { RecastBaseStyles, RecastThemeProps } from "../types.js";
import { getTheme } from "../recastThemeInstance.js";
import { getModifierClasses } from "../utils/getModifierClasses.js";
import { getVariantClasses } from "../utils/getVariantClasses.js";
import { mergeClassNames } from "../utils/mergeClassNames.js";
import { getDefaultVariantClasses } from "../utils/getDefaultVariantClasses.js";
import { getDefaultModifierClasses } from "../utils/getDefaultModifierClasses.js";
import { getConditionalClasses } from "../utils/getConditionalClasses.js";

type RecastClasses<K> = Record<keyof K, string> | undefined;

/**
 * Returns an object containing the CSS classes generated from the provided theme, variants, and modifiers.
 * @template K - The type of the base styles object.
 * @param {RecastThemeProps} props - An object containing the theme key, variants, and modifiers.
 * @returns {RecastClasses<K>} - An object containing the generated CSS classes.
 */
export const useRecastClasses = <K extends RecastBaseStyles>({
  themekey,
  variants,
  modifiers,
}: RecastThemeProps): RecastClasses<K> => {
  const theme = getTheme(themekey);

  const variantClasses = getVariantClasses({
    theme,
    variants,
  });

  const defaultVariantClasses = getDefaultVariantClasses({
    theme,
    variants,
  });

  const modifierClasses = getModifierClasses({
    theme,
    modifiers,
  });

  const defaultModifierClasses = getDefaultModifierClasses({
    theme,
    modifiers,
  });

  const conditionalClasses = getConditionalClasses({
    theme,
    variants,
    modifiers,
  });

  const classes = [
    theme?.base,
    variantClasses,
    defaultVariantClasses,
    modifierClasses,
    defaultModifierClasses,
    conditionalClasses,
  ].reduce((acc, curr) => {
    return mergeClassNames(acc, curr);
  }, {});

  return classes as RecastClasses<K>;
};
