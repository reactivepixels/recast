import type { RelaxedModifierProps, RelaxedRecastStyleProps, RelaxedStyles, RelaxedVariantProps } from "../types.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { getBaseClasses } from "./getBaseClasses.js";
import { getConditionalClasses } from "./getConditionalClasses.js";
import { getDefaultModifierClasses } from "./getDefaultModifierClasses.js";
import { getDefaultVariantClasses } from "./getDefaultVariantClasses.js";
import { getModifierClasses } from "./getModifierClasses.js";
import { getVariantClasses } from "./getVariantClasses.js";

type RecastClasses<B extends string = string> = {
  styles: RelaxedStyles<B>;
  variants: RelaxedVariantProps<B>;
  modifiers: RelaxedModifierProps;
  breakpoints?: B[];
};

type ClassGeneratorProps<B extends string = string> = {
  styles: RelaxedStyles<B>;
  variants: RelaxedVariantProps<B>;
  modifiers: RelaxedModifierProps;
};

/**
 * Generates and combines CSS classes based on the provided styles, variants, and modifiers.
 *
 * @param {RecastClasses} params - The input parameters
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and cls properties
 */
export function getRecastClasses<B extends string = string>({
  styles,
  variants,
  modifiers,
  breakpoints,
}: RecastClasses<B>): RelaxedRecastStyleProps {
  // Early return for empty inputs
  if (!styles || Object.keys(styles).length === 0) {
    return RECAST_STYLE_PROPS;
  }

  // Generate different types of classes
  const classGenerators: Array<(props: ClassGeneratorProps<B>) => RelaxedRecastStyleProps> = [
    getBaseClasses,
    ({ styles, variants }) => getVariantClasses({ styles, variants, breakpoints }),
    getDefaultVariantClasses,
    getModifierClasses,
    getDefaultModifierClasses,
    getConditionalClasses,
  ];

  // Combine all generated classes in a single reduce operation
  const result = classGenerators.reduce<RelaxedRecastStyleProps>((acc, generator) => {
    const generated = generator({ styles, variants, modifiers });
    return {
      className: mergeStringClassNames(acc.className, generated.className),
      cls: mergeObjectClassNames(acc.cls, generated.cls),
    };
  }, RECAST_STYLE_PROPS);

  // Ensure className is always a string
  const className = Array.isArray(result.className) ? result.className.join(" ") : result.className;

  return { className, cls: result.cls };
}
