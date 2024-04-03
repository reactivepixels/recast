import { RECAST_STYLE_PROPS } from "../constants.js";
import { RelaxedStyles } from "../types.js";

type Props = {
  styles: RelaxedStyles;
};

export const getBaseClasses = ({ styles = {} }: Props) => {
  if (!styles.base) return RECAST_STYLE_PROPS;

  if (typeof styles.base === "string" || Array.isArray(styles.base)) {
    return { className: styles.base, rcx: {} };
  }

  return { className: "", rcx: styles.base };
};
