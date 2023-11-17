import { mergeClassNames } from "./mergeClassNames.js";
import { RecastThemeProps, Styles } from "../types.js";

type Props = {
  // Entire component theme
  theme: Styles;
  // Component variant props
  modifiers?: RecastThemeProps["modifiers"];
};

export const getDefaultModifierClasses = ({
  theme = {},
  modifiers = [],
}: Props) => {
  if (!theme.modifiers) return {};

  if (theme.defaults?.modifiers) {
    const defaultModifierClasses = theme.defaults.modifiers.reduce(
      (acc, curr) => {
        if (!modifiers.includes(curr)) {
          return mergeClassNames(acc, theme.modifiers?.[curr]);
        }

        return acc;
      },
      {},
    );

    return defaultModifierClasses;
  }

  return {};
};
