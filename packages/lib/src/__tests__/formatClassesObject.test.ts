import { describe, it, expect } from "vitest";
import { formatClassesObject } from "../utils/common.js";
import { RECAST_STYLE_PROPS } from "../constants.js";

describe("formatClassesObject", () => {
  it("should return default RECAST_STYLE_PROPS when input is falsy", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(formatClassesObject(null as any)).toEqual(RECAST_STYLE_PROPS);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(formatClassesObject(undefined as any)).toEqual(RECAST_STYLE_PROPS);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(formatClassesObject("" as any)).toEqual(RECAST_STYLE_PROPS);
  });

  it("should handle string input correctly", () => {
    const result = formatClassesObject("text-base font-bold");
    expect(result).toEqual({
      className: "text-base font-bold",
      cls: {},
    });
  });

  it("should handle string array input correctly", () => {
    const result = formatClassesObject(["text-base", "font-bold"]);
    expect(result).toEqual({
      className: "text-base font-bold",
      cls: {},
    });
  });

  it("should handle string array with empty or undefined values", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = formatClassesObject(["text-base", "", undefined as any, "font-bold"]);
    expect(result).toEqual({
      className: "text-base font-bold",
      cls: {},
    });
  });

  it("should handle ClassNameRecord input correctly", () => {
    const result = formatClassesObject({
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
    const result = formatClassesObject({
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
    const result = formatClassesObject({
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
