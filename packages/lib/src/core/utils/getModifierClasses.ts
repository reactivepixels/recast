import { Styles } from "../types.js";
import { ClassNameRecord, mergeClassNames } from "./mergeClassNames.js";
import { omit } from "./omit.js";

type Modifiers = Record<
  string,
  Record<string, string | string[] | Record<string, string | string[]>>
>;

type GetModifierClassesProps = {
  theme: Styles;
  modifiers?: Modifiers;
  prop?: string | string[];
  size?: string;
  variant?: string;
};

export const getModifierClasses = ({
  theme,
  prop,
  size,
  variant,
  modifiers,
}: GetModifierClassesProps):
  | Omit<
      Record<string, string | string[] | Record<string, string | string[]>>,
      string
    >
  | string => {
  if (!modifiers) return {};

  // Normalize modifier props into array
  const modifierProps: string[] = Array.isArray(prop) ? prop : [prop || ""];
  // Extract size keys
  const sizeKeys = Object.keys(theme?.size || {});
  // Extract variant keys
  const variantKeys = Object.keys(theme?.variant || {});

  return modifierProps.reduce((acc, modifier) => {
    // Get base modifier styles
    const baseModifier = modifier ? modifiers?.[modifier] : {};
    // Get any size based modifiers
    const sizeModifier = size && modifier ? modifiers?.[modifier]?.[size] : {};
    // Get any variant based modifiers
    const variantModifier =
      variant && modifier ? modifiers?.[modifier]?.[variant] : {};

    return mergeClassNames(
      acc,
      // Merge base modifier classes with size based modifier classes
      mergeClassNames(
        omit([...sizeKeys, ...variantKeys], baseModifier) as ClassNameRecord,
        mergeClassNames(
          sizeModifier as ClassNameRecord,
          variantModifier as ClassNameRecord,
        ),
      ),
    );
  }, {});
};
