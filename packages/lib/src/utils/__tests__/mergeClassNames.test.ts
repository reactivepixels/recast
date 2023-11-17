import {
  mergeClassNames,
  mergeValues,
  normalizeValue,
} from "../mergeClassNames.js";

describe("mergeClassNames", () => {
  it("should combine two string values from duplicate key", () => {
    const target = { root: "hello" };
    const source = { root: "world" };
    const expectedResult = { root: "hello world" };

    expect(mergeClassNames(target, source)).toEqual(expectedResult);
  });

  it("should combine two arrays with duplicate keys", () => {
    const target = { root: ["hello"] };
    const source = { root: ["world"] };
    const expectedResult = { root: "hello world" };

    expect(mergeClassNames(target, source)).toEqual(expectedResult);
  });

  it("should combine mixed array/string from duplicate key", () => {
    const target = { root: ["hello"] };
    const source = { root: "world" };
    const expectedResult = { root: "hello world" };

    expect(mergeClassNames(target, source)).toEqual(expectedResult);
  });

  it("should combine mixed string/array from duplicate key", () => {
    const target = { root: "hello" };
    const source = { root: ["world"] };
    const expectedResult = { root: "hello world" };

    expect(mergeClassNames(target, source)).toEqual(expectedResult);
  });

  it("should handle an empty target value", () => {
    const target = { root: "" };
    const source = { root: ["world"] };
    const expectedResult = { root: "world" };

    expect(mergeClassNames(target, source)).toEqual(expectedResult);
  });

  it("should handle an empty source value", () => {
    const target = { root: ["hello"] };
    const source = { root: "" };
    const expectedResult = { root: "hello" };

    expect(mergeClassNames(target, source)).toEqual(expectedResult);
  });

  it("should handle an empty target and source value", () => {
    const target = { root: "" };
    const source = { root: "" };
    const expectedResult = { root: "" };

    expect(mergeClassNames(target, source)).toEqual(expectedResult);
  });

  it("should handle an `undefined` target value", () => {
    const target = undefined;
    const source = { root: ["world"] };
    const expectedResult = { root: "world" };

    expect(mergeClassNames(target, source)).toEqual(expectedResult);
  });

  it("should handle an `undefined` source value", () => {
    const target = { root: ["hello"] };
    const source = undefined;
    const expectedResult = { root: "hello" };

    expect(mergeClassNames(target, source)).toEqual(expectedResult);
  });

  it("should handle an empty string target value", () => {
    const target = { root: [""] };
    const source = { root: ["world"] };
    const expectedResult = { root: "world" };

    expect(mergeClassNames(target, source)).toEqual(expectedResult);
  });

  it("should handle an empty string source value", () => {
    const target = { root: "hello" };
    const source = { root: "" };
    const expectedResult = { root: "hello" };

    expect(mergeClassNames(target, source)).toEqual(expectedResult);
  });

  it("should handle an `undefined` target and source value", () => {
    const target = undefined;
    const source = undefined;
    const expectedResult = {};

    expect(mergeClassNames(target, source)).toEqual(expectedResult);
  });
});

describe("mergeValues", () => {
  it("should combine two string values", () => {
    const target = "hello";
    const source = "world";
    const expectedResult = "hello world";

    expect(mergeValues(target, source)).toEqual(expectedResult);
  });

  it("should handle an empty source value correctly", () => {
    const target = "hello";
    const source = "";
    const expectedResult = "hello";

    expect(mergeValues(target, source)).toEqual(expectedResult);
  });

  it("should handle an empty target value correctly", () => {
    const target = "";
    const source = "world";
    const expectedResult = "world";

    expect(mergeValues(target, source)).toEqual(expectedResult);
  });

  it("should handle two empty values correctly correctly", () => {
    const target = "";
    const source = "";
    const expectedResult = "";

    expect(mergeValues(target, source)).toEqual(expectedResult);
  });
});

describe("normalizeValue", () => {
  it("should remove leading and trailing whitespace", () => {
    const value = " hello world ";
    const expectedResult = "hello world";

    expect(normalizeValue(value)).toEqual(expectedResult);
  });

  it("should handle an empty string correctly", () => {
    const value = "";
    const expectedResult = "";

    expect(normalizeValue(value)).toEqual(expectedResult);
  });

  it("should handle an `undefined` value correctly", () => {
    const value = undefined;
    const expectedResult = "";

    expect(normalizeValue(value)).toEqual(expectedResult);
  });

  it("should handle an array of values correctly", () => {
    const value = ["hello", "world"];
    const expectedResult = "hello world";

    expect(normalizeValue(value)).toEqual(expectedResult);
  });

  it("should remove leading and trailing whitespace from an array of values", () => {
    const value = [" hello ", " world "];
    const expectedResult = "hello world";

    expect(normalizeValue(value)).toEqual(expectedResult);
  });

  it("should handle an empty array correctly", () => {
    const value = [""];
    const expectedResult = "";

    expect(normalizeValue(value)).toEqual(expectedResult);
  });
});
