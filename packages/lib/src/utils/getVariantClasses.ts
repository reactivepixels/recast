import { RelaxedStyles, RelaxedVariantProps, ClassNameRecord } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses } from "./generateResponsiveClasses.js";
import { mergeObjectClassNames, mergeStringClassNames } from "./mergeClassNames.js";

type Props<B extends string = string> = {
  styles: RelaxedStyles<B>;
  variants: RelaxedVariantProps<B>;
};

export const getVariantClasses = <B extends string = string>({ styles = {}, variants = {} }: Props<B>) => {
  if (!styles.variants) return RECAST_STYLE_PROPS;

  return Object.entries(variants).reduce((acc, [variantKey, variantValue]) => {
    if (typeof variantValue === "string") {
      const variantStyles = styles.variants?.[variantKey]?.[variantValue];
      if (variantStyles) {
        const responsiveClasses = generateResponsiveClasses(variantStyles);
        return {
          className: mergeStringClassNames(acc.className, responsiveClasses.className),
          rcx: mergeObjectClassNames(acc.rcx, responsiveClasses.rcx),
        };
      }
    } else if (typeof variantValue === "object" && variantValue !== null) {
      const responsiveClasses = Object.entries(variantValue).reduce((innerAcc, [breakpoint, value]) => {
        const variantStyles = styles.variants?.[variantKey]?.[value as string];
        if (variantStyles) {
          const breakpointPrefix = breakpoint === "default" ? "" : `${breakpoint}:`;
          const classes = generateResponsiveClasses(variantStyles);
          const prefixedClasses = {
            className: classes.className
              .split(" ")
              .map((cls) => `${breakpointPrefix}${cls}`)
              .join(" "),
            rcx: Object.entries(classes.rcx).reduce((rcxAcc, [rcxKey, rcxValue]) => {
              rcxAcc[rcxKey] = (Array.isArray(rcxValue) ? rcxValue : rcxValue.split(" "))
                .map((cls) => `${breakpointPrefix}${cls}`)
                .join(" ");
              return rcxAcc;
            }, {} as ClassNameRecord),
          };
          return {
            className: mergeStringClassNames(innerAcc.className, prefixedClasses.className),
            rcx: mergeObjectClassNames(innerAcc.rcx, prefixedClasses.rcx),
          };
        }
        return innerAcc;
      }, RECAST_STYLE_PROPS);

      return {
        className: mergeStringClassNames(acc.className, responsiveClasses.className),
        rcx: mergeObjectClassNames(acc.rcx, responsiveClasses.rcx),
      };
    }
    return acc;
  }, RECAST_STYLE_PROPS);
};
