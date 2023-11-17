import { mergeClassNames } from "./mergeClassNames.js";
import { RecastThemeProps, Styles } from "../types.js";

type Props = {
  // Entire component theme
  theme: Styles;
  // Component modifier props
  modifiers?: RecastThemeProps["modifiers"];
};

export const getModifierClasses = ({ theme, modifiers }: Props) => {
  if (!theme.modifiers) return {};

  if (modifiers) {
    const modifierClasses = modifiers.reduce((acc, curr) => {
      return mergeClassNames(acc, theme.modifiers?.[curr]);
    }, {});

    return modifierClasses;
  }

  return {};
};
