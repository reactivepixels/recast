import { isObject } from "../isObject.js";

describe("isObject", () => {
  it("should return true when an object is passed", () => {
    const obj = { key: "value" };
    expect(isObject(obj)).toBe(true);
  });

  it("should return false when an array is passed", () => {
    const arr = [1, 2, 3];
    expect(isObject(arr)).toBe(false);
  });

  it("should return false when null is passed", () => {
    expect(isObject(null)).toBe(false);
  });

  it("should return false when a non-object value is passed", () => {
    expect(isObject(123)).toBe(false);
    expect(isObject("string")).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });
});
