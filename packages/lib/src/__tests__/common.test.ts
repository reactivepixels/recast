import { describe, it, expect, vi } from "vitest";
import {
  isString,
  isStringArray,
  isNonNullObject,
  normalizeClasses,
  generateResponsiveClasses,
  isVariantMatch,
  safeObjectAccess,
  getDefaultValue,
  mergeArrays,
  isEmptyObject,
  memoize,
  omit,
} from "../utils/common.js";
import { RECAST_STYLE_PROPS } from "../constants.js";

describe("common utilities", () => {
  describe("isString", () => {
    it("should return true for string values", () => {
      expect(isString("hello")).toBe(true);
      expect(isString("")).toBe(true);
    });

    it("should return false for non-string values", () => {
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString(true)).toBe(false);
    });
  });

  describe("isStringArray", () => {
    it("should return true for arrays of strings", () => {
      expect(isStringArray(["hello", "world"])).toBe(true);
      expect(isStringArray([""])).toBe(true);
      expect(isStringArray([])).toBe(true);
    });

    it("should return true for arrays with undefined or null values", () => {
      expect(isStringArray(["hello", undefined, "world"])).toBe(true);
      expect(isStringArray(["hello", null, "world"])).toBe(true);
    });

    it("should return false for non-array values", () => {
      expect(isStringArray("hello")).toBe(false);
      expect(isStringArray(123)).toBe(false);
      expect(isStringArray(null)).toBe(false);
      expect(isStringArray(undefined)).toBe(false);
      expect(isStringArray({})).toBe(false);
    });

    it("should return false for arrays with non-string values", () => {
      expect(isStringArray(["hello", 123, "world"])).toBe(false);
      expect(isStringArray([{}, "world"])).toBe(false);
      expect(isStringArray([true, "world"])).toBe(false);
    });
  });

  describe("isNonNullObject", () => {
    it("should return true for non-null objects", () => {
      expect(isNonNullObject({})).toBe(true);
      expect(isNonNullObject({ hello: "world" })).toBe(true);
    });

    it("should return false for null or non-object values", () => {
      expect(isNonNullObject(null)).toBe(false);
      expect(isNonNullObject(undefined)).toBe(false);
      expect(isNonNullObject("hello")).toBe(false);
      expect(isNonNullObject(123)).toBe(false);
      expect(isNonNullObject(true)).toBe(false);
    });

    it("should return true for arrays (which are objects in JavaScript)", () => {
      expect(isNonNullObject([])).toBe(true);
    });
  });

  describe("normalizeClasses", () => {
    it("should return an empty string for undefined or empty input", () => {
      expect(normalizeClasses()).toBe("");
      expect(normalizeClasses("")).toBe("");
      expect(normalizeClasses([])).toBe("");
    });

    it("should trim and return a single string", () => {
      expect(normalizeClasses("hello")).toBe("hello");
      expect(normalizeClasses(" hello ")).toBe("hello");
    });

    it("should join and trim an array of strings", () => {
      expect(normalizeClasses(["hello", "world"])).toBe("hello world");
      expect(normalizeClasses([" hello ", " world "])).toBe("hello world");
    });

    it("should filter out falsy values from arrays", () => {
      expect(normalizeClasses(["hello", "", "world"])).toBe("hello world");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(normalizeClasses(["hello", undefined as any, "world"])).toBe("hello world");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(normalizeClasses(["hello", null as any, "world"])).toBe("hello world");
    });

    it("should throw an error for invalid input types", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => normalizeClasses(123 as any)).toThrow("Invalid input type for normalizeClasses");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => normalizeClasses({} as any)).toThrow("Invalid input type for normalizeClasses");
    });
  });

  describe("generateResponsiveClasses", () => {
    it("should return RECAST_STYLE_PROPS for falsy input", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(generateResponsiveClasses(undefined as any)).toEqual(RECAST_STYLE_PROPS);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(generateResponsiveClasses(null as any)).toEqual(RECAST_STYLE_PROPS);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(generateResponsiveClasses("" as any)).toEqual(RECAST_STYLE_PROPS);
    });

    it("should handle string input", () => {
      expect(generateResponsiveClasses("hello")).toEqual({
        className: "hello",
        cls: {},
      });
    });

    it("should handle string array input", () => {
      expect(generateResponsiveClasses(["hello", "world"])).toEqual({
        className: "hello world",
        cls: {},
      });
    });

    it("should handle object input", () => {
      expect(generateResponsiveClasses({ sm: "small", md: "medium", lg: "large" })).toEqual({
        className: "",
        cls: {
          sm: "small",
          md: "medium",
          lg: "large",
        },
      });
    });

    it("should normalize values in object input", () => {
      expect(generateResponsiveClasses({ sm: " small ", md: ["medium", "mid"] })).toEqual({
        className: "",
        cls: {
          sm: "small",
          md: "medium mid",
        },
      });
    });
  });

  describe("isVariantMatch", () => {
    it("should match string values correctly", () => {
      expect(isVariantMatch("lg", "lg")).toBe(true);
      expect(isVariantMatch("lg", "sm")).toBe(false);
    });

    it("should match array values correctly", () => {
      expect(isVariantMatch(["lg", "md"], "lg")).toBe(true);
      expect(isVariantMatch(["lg", "md"], "md")).toBe(true);
      expect(isVariantMatch(["lg", "md"], "sm")).toBe(false);
    });
  });

  describe("safeObjectAccess", () => {
    it("should access nested properties safely", () => {
      const obj = {
        a: {
          b: {
            c: "value",
          },
        },
      };
      expect(safeObjectAccess(obj, ["a", "b", "c"])).toBe("value");
    });

    it("should return undefined for non-existent paths", () => {
      const obj = {
        a: {
          b: {
            c: "value",
          },
        },
      };
      expect(safeObjectAccess(obj, ["a", "x", "c"])).toBeUndefined();
      expect(safeObjectAccess(obj, ["x"])).toBeUndefined();
    });

    it("should handle empty objects and paths", () => {
      expect(safeObjectAccess({}, ["a"])).toBeUndefined();
      expect(safeObjectAccess({ a: 1 }, [])).toEqual({ a: 1 });
    });
  });

  describe("getDefaultValue", () => {
    it("should return the value if defined", () => {
      expect(getDefaultValue("hello", "default")).toBe("hello");
      expect(getDefaultValue(0, 1)).toBe(0);
      expect(getDefaultValue(false, true)).toBe(false);
    });

    it("should return the default value if the value is undefined", () => {
      expect(getDefaultValue(undefined, "default")).toBe("default");
    });
  });

  describe("mergeArrays", () => {
    it("should merge multiple arrays", () => {
      expect(mergeArrays([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
      expect(mergeArrays(["a", "b"], ["c", "d"])).toEqual(["a", "b", "c", "d"]);
    });

    it("should handle undefined arrays", () => {
      expect(mergeArrays([1, 2], undefined, [3, 4])).toEqual([1, 2, 3, 4]);
      expect(mergeArrays(undefined, undefined)).toEqual([]);
    });

    it("should handle empty arrays", () => {
      expect(mergeArrays([], [1, 2])).toEqual([1, 2]);
      expect(mergeArrays([], [])).toEqual([]);
    });
  });

  describe("isEmptyObject", () => {
    it("should return true for empty objects", () => {
      expect(isEmptyObject({})).toBe(true);
    });

    it("should return false for non-empty objects", () => {
      expect(isEmptyObject({ a: 1 })).toBe(false);
      expect(isEmptyObject({ a: undefined })).toBe(false);
    });
  });

  describe("memoize", () => {
    it("should cache function results", () => {
      const fn = vi.fn((a: number, b: number) => a + b);
      const memoizedFn = memoize(fn);

      // First call should execute the function
      expect(memoizedFn(1, 2)).toBe(3);
      expect(fn).toHaveBeenCalledTimes(1);

      // Second call with same args should use cached result
      expect(memoizedFn(1, 2)).toBe(3);
      expect(fn).toHaveBeenCalledTimes(1);

      // Call with different args should execute the function again
      expect(memoizedFn(2, 3)).toBe(5);
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it("should handle complex arguments", () => {
      const fn = vi.fn((obj: { a: number; b: number }) => obj.a + obj.b);
      const memoizedFn = memoize(fn);

      expect(memoizedFn({ a: 1, b: 2 })).toBe(3);
      expect(fn).toHaveBeenCalledTimes(1);

      expect(memoizedFn({ a: 1, b: 2 })).toBe(3);
      expect(fn).toHaveBeenCalledTimes(1);

      expect(memoizedFn({ a: 2, b: 3 })).toBe(5);
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe("omit", () => {
    it("should omit specified keys from an object", () => {
      const obj = { a: "1", b: "2", c: "3" };
      expect(omit(["a", "c"], obj)).toEqual({ b: "2" });
    });

    it("should handle empty arrays and objects", () => {
      expect(omit([], { a: "1" })).toEqual({ a: "1" });
      expect(omit(["a"], {})).toEqual({});
    });

    it("should handle undefined inputs", () => {
      expect(omit(undefined, { a: "1" })).toEqual({ a: "1" });
      expect(omit(["a"], undefined)).toEqual({});
      expect(omit(undefined, undefined)).toEqual({});
    });

    it("should handle complex object values", () => {
      const obj = {
        a: "1",
        b: ["2", "3"],
        c: { d: "4", e: "5" },
      };
      expect(omit(["a"], obj)).toEqual({
        b: ["2", "3"],
        c: { d: "4", e: "5" },
      });
    });
  });
});
