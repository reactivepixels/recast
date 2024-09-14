import { RelaxedStyles } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";

type Props = {
  styles: RelaxedStyles;
};

/**
 * Extracts base classes from the provided styles object.
 *
 * @param {Object} props - The input properties.
 * @param {RelaxedStyles} props.styles - The styles object, defaulting to an empty object.
 * @returns {Object} An object containing className and rcx properties.
 *
 * @description
 * This function handles three scenarios:
 * 1. If styles.base is undefined, it returns the default RECAST_STYLE_PROPS.
 * 2. If styles.base is a string or an array, it returns an object with className set to styles.base and an empty rcx object.
 * 3. If styles.base is an object, it returns an object with an empty className and rcx set to styles.base.
 */
export const getBaseClasses = ({ styles = {} }: Props) => {
  if (!styles.base) return RECAST_STYLE_PROPS;

  if (typeof styles.base === "string" || Array.isArray(styles.base)) {
    return { className: styles.base, rcx: {} };
  }

  return { className: "", rcx: styles.base };
};
