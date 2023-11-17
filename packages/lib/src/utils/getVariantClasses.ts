import { mergeClassNames } from "./mergeClassNames.js";
import { RecastThemeProps, Styles } from "../types.js";

type Props = {
  // Entire component theme
  theme: Styles;
  // Component variant props
  variants?: RecastThemeProps["variants"];
};

export const getVariantClasses = ({ theme = {}, variants = {} }: Props) => {
  if (!theme.variants) return {};

  const variantKeys = Object.keys(variants);

  const variantClasses = variantKeys.reduce((acc, curr) => {
    return mergeClassNames(acc, theme.variants?.[curr][variants[curr]]);
  }, {});

  return variantClasses;
};
