import { getVariantClasses } from "../getVariantClasses.js";

describe("getVariantClasses", () => {
  const theme = {
    variants: {
      color: {
        red: { root: "text-red-500" },
        blue: { root: "text-blue-500" },
      },
      size: {
        small: { root: "text-sm" },
        large: { root: "text-lg" },
      },
    },
  };

  it("should return an empty object if theme variants are not defined", () => {
    const props = { theme: {}, variants: {} };
    const variantClasses = getVariantClasses(props);
    expect(variantClasses).toEqual({});
  });

  it("should return an empty object if variants are not defined", () => {
    const props = { theme, variants: undefined };
    const variantClasses = getVariantClasses(props);
    expect(variantClasses).toEqual({});
  });

  it("should return an object with variant classes", () => {
    const props = { theme, variants: { color: "red", size: "small" } };
    const variantClasses = getVariantClasses(props);
    expect(variantClasses).toEqual({ root: "text-red-500 text-sm" });
  });

  it("should merge variant classes if multiple variants are defined", () => {
    const props = { theme, variants: { color: "blue", size: "large" } };
    const variantClasses = getVariantClasses(props);
    expect(variantClasses).toEqual({ root: "text-blue-500 text-lg" });
  });
});
