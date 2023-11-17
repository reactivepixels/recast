import { mergeClassNames } from "./mergeClassNames.js";
import { RecastThemeProps, Styles } from "../types.js";

type Props = {
  // Entire component theme
  theme: Styles;
  // Component variant props
  variants?: RecastThemeProps["variants"];
};

export const getDefaultVariantClasses = ({
  theme = {},
  variants = {},
}: Props) => {
  if (!theme.variants) return {};

  if (theme.defaults?.variants) {
    const defaultVariantKeys = Object.keys(theme.defaults.variants);

    const defaultVariantClasses = defaultVariantKeys.reduce((acc, curr) => {
      if (!variants?.[curr]) {
        if (theme.defaults?.variants?.[curr]) {
          return mergeClassNames(
            acc,
            theme.variants?.[curr][theme.defaults.variants[curr]],
          );
        }
      }

      return acc;
    }, {});

    return defaultVariantClasses;
  }

  return {};
};
