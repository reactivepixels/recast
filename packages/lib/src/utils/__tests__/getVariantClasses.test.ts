import { getVariantClasses } from "../getVariantClasses.js";

describe("getVariantClasses", () => {
  const styles = {
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
    const props = { styles: {}, variants: {} };
    const variantClasses = getVariantClasses(props);
    expect(variantClasses).toEqual({ classNames: "", rcx: {} });
  });

  it("should return an empty object if variants are not defined", () => {
    const props = { styles, variants: undefined };
    const variantClasses = getVariantClasses(props);
    expect(variantClasses).toEqual({ classNames: "", rcx: {} });
  });

  it("should return an object with variant classes", () => {
    const props = { styles, variants: { color: "red", size: "small" } };
    const variantClasses = getVariantClasses(props);
    expect(variantClasses).toEqual({ classNames: "", rcx: { root: "text-red-500 text-sm" } });
  });

  it("should merge variant classes if multiple variants are defined", () => {
    const props = { styles, variants: { color: "blue", size: "large" } };
    const variantClasses = getVariantClasses(props);
    expect(variantClasses).toEqual({ classNames: "", rcx: { root: "text-blue-500 text-lg" } });
  });
});
