import { describe, it, expect } from "vitest";
import { generateResponsiveClasses } from "../utils/generateResponsiveClasses.js";
import { RECAST_STYLE_PROPS } from "../constants.js";

describe("generateResponsiveClasses", () => {
  it("should return default RECAST_STYLE_PROPS when input is falsy", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(generateResponsiveClasses(null as any)).toEqual(RECAST_STYLE_PROPS);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(generateResponsiveClasses(undefined as any)).toEqual(RECAST_STYLE_PROPS);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(generateResponsiveClasses("" as any)).toEqual(RECAST_STYLE_PROPS);
  });

  it("should handle string input correctly", () => {
    const result = generateResponsiveClasses("text-base font-bold");
    expect(result).toEqual({
      className: "text-base font-bold",
      cls: {},
    });
  });

  it("should handle string array input correctly", () => {
    const result = generateResponsiveClasses(["text-base", "font-bold"]);
    expect(result).toEqual({
      className: "text-base font-bold",
      cls: {},
    });
  });

  it("should handle string array with empty or undefined values", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = generateResponsiveClasses(["text-base", "", undefined as any, "font-bold"]);
    expect(result).toEqual({
      className: "text-base font-bold",
      cls: {},
    });
  });

  it("should handle ClassNameRecord input correctly", () => {
    const result = generateResponsiveClasses({
      default: "text-base",
      md: "text-lg",
      dark: "text-white",
    });

    expect(result).toEqual({
      className: "",
      cls: {
        default: "text-base",
        md: "text-lg",
        dark: "text-white",
      },
    });
  });

  it("should handle ClassNameRecord with array values", () => {
    const result = generateResponsiveClasses({
      default: ["text-base", "font-normal"],
      md: ["text-lg", "font-bold"],
    });

    expect(result).toEqual({
      className: "",
      cls: {
        default: "text-base font-normal",
        md: "text-lg font-bold",
      },
    });
  });

  it("should handle ClassNameRecord with empty or undefined values", () => {
    const result = generateResponsiveClasses({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      default: ["text-base", "", undefined as any],
      md: "text-lg",
      lg: "",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      xl: undefined as any,
    });

    expect(result).toEqual({
      className: "",
      cls: {
        default: "text-base",
        md: "text-lg",
        lg: "",
        xl: "",
      },
    });
  });
});
