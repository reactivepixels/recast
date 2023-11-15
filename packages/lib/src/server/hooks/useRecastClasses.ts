import type { RecastThemeProps } from "../../server/types.js";
import { getTheme } from "../../core/recastThemeInstance.js";
import { getModifierClasses } from "../../core/utils/getModifierClasses.js";
import { getSizeClasses } from "../../core/utils/getSizeClasses.js";
import { getVariantClasses } from "../../core/utils/getVariantClasses.js";
import { mergeClassNames } from "../../core/utils/mergeClassNames.js";
import { Styles } from "../../core/types.js";

type State<K> = Record<keyof K, string> | undefined;

export const useRecastClasses = <K extends Record<string, string | string[]>>({
  themekey,
  size,
  variant,
  modifier,
}: RecastThemeProps) => {
  const theme = themekey ? getTheme()?.[themekey] : ({} as Styles);

  const sizes = getSizeClasses({
    prop: typeof size === "string" ? size : "",
    sizes: theme?.size,
    fallback: theme?.defaults?.size,
  });

  const variants = getVariantClasses({
    theme,
    size: typeof size === "string" ? size : "" || theme?.defaults?.size,
    prop: typeof variant === "string" ? variant : "",
    variants: theme?.variant,
    fallback: theme?.defaults?.variant,
  });

  const modifiers = getModifierClasses({
    theme,
    size: typeof size === "string" ? size : "" || theme?.defaults?.size,
    variant:
      typeof variant === "string" ? variant : "" || theme?.defaults?.variant,
    prop: modifier,
    modifiers: theme?.modifier,
  });

  const classes = [theme?.base, sizes, variants, modifiers].reduce(
    (acc, curr) => {
      if (!!acc && !!curr) return mergeClassNames(acc, curr);

      return acc;
    },
    {} as Record<string, string>,
  );

  return classes as State<K>;
};
