import { RECAST_STYLE_PROPS } from "../constants.js";
import { ClassNameRecord } from "../types.js";

export const generateResponsiveClasses = (classes: string | string[] | ClassNameRecord, breakpoints: string[]) => {
  if (!classes) return RECAST_STYLE_PROPS;

  const generateForBreakpoints = (cls: string) => {
    return [cls, ...breakpoints.map((bp) => `${bp}:${cls}`)];
  };

  if (typeof classes === "string") {
    const responsiveClasses = classes.split(/\s+/).flatMap(generateForBreakpoints);
    return { className: responsiveClasses.join(" "), rcx: {} };
  } else if (Array.isArray(classes)) {
    const responsiveClasses = classes.flatMap(generateForBreakpoints);
    return { className: responsiveClasses.join(" "), rcx: {} };
  } else {
    const rcx: Record<string, string> = {};
    for (const [key, value] of Object.entries(classes)) {
      const classArray = typeof value === "string" ? value.split(/\s+/) : value;
      rcx[key] = classArray.flatMap(generateForBreakpoints).join(" ");
    }
    return { className: "", rcx };
  }
};
