import { RECAST_STYLE_PROPS } from "../constants.js";
import { ClassNameRecord } from "../types.js";

export const generateResponsiveClasses = (classes: string | string[] | ClassNameRecord) => {
  if (!classes) return RECAST_STYLE_PROPS;

  if (typeof classes === "string") {
    const responsiveClasses = classes.split(/\s+/);
    return { className: responsiveClasses.join(" "), rcx: {} };
  } else if (Array.isArray(classes)) {
    const responsiveClasses = classes;
    return { className: responsiveClasses.join(" "), rcx: {} };
  } else {
    const rcx: Record<string, string> = {};
    for (const [key, value] of Object.entries(classes)) {
      const classArray = typeof value === "string" ? value.split(/\s+/) : value;
      rcx[key] = classArray.join(" ");
    }
    return { className: "", rcx };
  }
};
