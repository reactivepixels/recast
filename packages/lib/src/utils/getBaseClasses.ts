import { RelaxedStyles } from "../types.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import { generateResponsiveClasses } from "./generateResponsiveClasses.js";

type Props = {
  styles: RelaxedStyles;
  breakpoints: string[];
};

export const getBaseClasses = ({ styles = {}, breakpoints = [] }: Props) => {
  if (!styles.base) return RECAST_STYLE_PROPS;

  return generateResponsiveClasses(styles.base, breakpoints);
};
