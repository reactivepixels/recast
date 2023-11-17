import { omit } from "../omit.js";

describe("omit", () => {
  let originalObject:
    | Record<string, string | string[] | Record<string, string | string[]>>
    | undefined;

  beforeEach(() => {
    originalObject = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };
  });

  it("should return a new object", () => {
    const result = omit(["key1"], originalObject);
    expect(result).not.toBe(originalObject);
  });

  it("should correctly remove the specified keys from the original object", () => {
    const result = omit(["key1", "key2"], originalObject);
    expect(result).toEqual({ key3: "value3" });
  });

  it("should not modify the original object", () => {
    omit(["key1", "key2"], originalObject);
    expect(originalObject).toEqual({
      key1: "value1",
      key2: "value2",
      key3: "value3",
    });
  });

  it("should return an empty object when an empty object is passed", () => {
    const result = omit(["key1", "key2"], {});
    expect(result).toEqual({});
  });

  it("should return an empty object when no values are passed", () => {
    const result = omit(undefined, undefined);
    expect(result).toEqual({});
  });
});
