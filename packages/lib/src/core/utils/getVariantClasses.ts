import { omit } from "./omit.js";
import { ClassNameRecord, mergeClassNames } from "./mergeClassNames.js";
import { Styles } from "../types.js";

type GetVariantClassesProps = {
  theme: Styles;
  variants?: Record<
    string,
    Record<string, string | string[] | Record<string, string | string[]>>
  >;
  prop?: string;
  size?: string;
  fallback?: string;
};

export const getVariantClasses = ({
  theme,
  prop,
  variants,
  size,
  fallback,
}: GetVariantClassesProps):
  | Omit<
      Record<string, string | string[] | Record<string, string | string[]>>,
      string
    >
  | string => {
  if (!variants) return {};

  // Extract size keys
  const sizeKeys = Object.keys(theme?.size || {});
  // Determine `variant` to use
  const variant = prop || fallback;
  // Get base variant styles
  const baseVariant = variant ? variants?.[variant] : {};
  // Get any size based variants
  const sizeVariant = size && variant ? variants?.[variant]?.[size] : {};

  return mergeClassNames(
    omit(sizeKeys, baseVariant) as ClassNameRecord,
    sizeVariant as ClassNameRecord,
  );
};
