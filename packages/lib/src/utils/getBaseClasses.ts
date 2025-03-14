import type { RelaxedRecastStyleProps, RelaxedStyles } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses } from "./common.js";

type GetBaseClassesProps = {
  styles: RelaxedStyles;
};

/**
 * Generates base classes from the provided styles.
 *
 * @param {GetBaseClassesProps} props - The input properties
 * @returns {RelaxedRecastStyleProps} An object containing the generated className and cls properties
 */
export const getBaseClasses = ({ styles }: GetBaseClassesProps): RelaxedRecastStyleProps => {
  if (!styles.base) return RECAST_STYLE_PROPS;

  return generateResponsiveClasses(styles.base);
};
