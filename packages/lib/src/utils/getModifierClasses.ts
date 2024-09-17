import { RelaxedModifierProps, RelaxedStyles, RelaxedRecastStyleProps } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses, isNonNullObject, getUnsetClass } from "./common.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

type GetModifierClassesProps = {
  styles: RelaxedStyles;
  modifiers: RelaxedModifierProps;
};

/**
 * Generates modifier classes based on the provided styles and modifiers.
 *
 * @param {GetModifierClassesProps} props - The input properties
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and rcx properties
 */
export const getModifierClasses = ({ styles, modifiers }: GetModifierClassesProps): RelaxedRecastStyleProps => {
  if (!styles.modifiers || Object.keys(modifiers).length === 0) return RECAST_STYLE_PROPS;

  return Object.entries(modifiers).reduce<RelaxedRecastStyleProps>((acc, [modifierKey, modifierValue]) => {
    const modifierStyles = styles.modifiers?.[modifierKey];
    if (!modifierStyles) return acc;

    if (typeof modifierValue === "boolean") {
      return processSimpleModifier(acc, modifierStyles, modifierValue);
    } else if (isNonNullObject(modifierValue)) {
      return processResponsiveModifier(acc, modifierStyles, modifierValue);
    }

    return acc;
  }, RECAST_STYLE_PROPS);
};

const processSimpleModifier = (
  acc: RelaxedRecastStyleProps,
  modifierStyles: string | string[] | Record<string, string | string[]>,
  modifierValue: boolean,
): RelaxedRecastStyleProps => {
  if (modifierValue) {
    const responsiveClasses = generateResponsiveClasses(modifierStyles);
    return {
      className: mergeStringClassNames(acc.className, responsiveClasses.className),
      rcx: mergeObjectClassNames(acc.rcx, responsiveClasses.rcx),
    };
  }
  return acc;
};

const processResponsiveModifier = (
  acc: RelaxedRecastStyleProps,
  modifierStyles: string | string[] | Record<string, string | string[]>,
  modifierValue: Record<string, boolean>,
): RelaxedRecastStyleProps => {
  const responsiveClasses = Object.entries(modifierValue).reduce<RelaxedRecastStyleProps>(
    (innerAcc, [breakpoint, value]) => {
      if (value === false) {
        const unsetClass = getUnsetClass(modifierStyles, breakpoint);
        if (typeof unsetClass === "string") {
          return {
            className: mergeStringClassNames(innerAcc.className, unsetClass),
            rcx: innerAcc.rcx,
          };
        } else if (Array.isArray(unsetClass)) {
          return {
            className: mergeStringClassNames(innerAcc.className, unsetClass.join(" ")),
            rcx: innerAcc.rcx,
          };
        } else {
          // Handle ClassNameRecord
          const unsetClassName = Object.values(unsetClass).flat().join(" ");
          return {
            className: mergeStringClassNames(innerAcc.className, unsetClassName),
            rcx: mergeObjectClassNames(innerAcc.rcx, unsetClass),
          };
        }
      } else if (value === true) {
        const classes = generateResponsiveClasses(modifierStyles);
        const breakpointPrefix = breakpoint === "default" ? "" : `${breakpoint}:`;
        const prefixedClasses = prefixClasses(classes, breakpointPrefix);

        return {
          className: mergeStringClassNames(innerAcc.className, prefixedClasses.className),
          rcx: mergeObjectClassNames(innerAcc.rcx, prefixedClasses.rcx),
        };
      }
      return innerAcc;
    },
    RECAST_STYLE_PROPS,
  );

  return {
    className: mergeStringClassNames(acc.className, responsiveClasses.className),
    rcx: mergeObjectClassNames(acc.rcx, responsiveClasses.rcx),
  };
};

const prefixClasses = (classes: RelaxedRecastStyleProps, prefix: string): RelaxedRecastStyleProps => ({
  className: classes.className
    .split(" ")
    .map((cls) => `${prefix}${cls}`)
    .join(" "),
  rcx: Object.entries(classes.rcx).reduce<Record<string, string>>((rcxAcc, [rcxKey, rcxValue]) => {
    rcxAcc[rcxKey] = (Array.isArray(rcxValue) ? rcxValue : rcxValue.split(" "))
      .map((cls) => `${prefix}${cls}`)
      .join(" ");
    return rcxAcc;
  }, {}),
});
