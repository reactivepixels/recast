import { getDefaultVariantClasses } from "../getDefaultVariantClasses.js";
import { Styles, RecastThemeProps } from "../../types.js";

describe("getDefaultVariantClasses", () => {
  let theme: Styles;
  let variants: RecastThemeProps["variants"];

  beforeEach(() => {
    theme = {
      defaults: {
        variants: {
          variant1: "variant1Value1",
          variant2: "variant2Value1",
        },
      },
      variants: {
        variant1: {
          variant1Value1: { root: "variant1Value1-classes" },
          variant1Value2: { root: "variant1Value2-classes" },
        },
        variant2: {
          variant2Value1: { root: "variant2Value1-classes" },
          variant2Value2: { root: "variant2Value2-classes" },
        },
      },
    };
    variants = {};
  });

  it("returns an object", () => {
    const classes = getDefaultVariantClasses({ theme, variants });
    expect(typeof classes).toBe("object");
  });

  it("should correctly apply default variants", () => {
    const classes = getDefaultVariantClasses({ theme, variants });
    expect(classes).toEqual({
      root: "variant1Value1-classes variant2Value1-classes",
    });
  });

  it("should correctly apply default variants when some are already specified", () => {
    variants = { variant1: "variant1Value2" };
    const classes = getDefaultVariantClasses({ theme, variants });
    expect(classes).toEqual({
      root: "variant2Value1-classes",
    });
  });

  it("should not apply a default variant if already specified", () => {
    variants = { variant1: "variant1Value1", variant2: "variant2Value1" };
    const classes = getDefaultVariantClasses({ theme, variants });
    expect(classes).toEqual({});
  });

  it("should handle undefined theme variants object", () => {
    theme.variants = undefined;
    const classes = getDefaultVariantClasses({ theme, variants });
    expect(classes).toEqual({});
  });

  it("should handle undefined default variants object", () => {
    theme.defaults = undefined;
    const classes = getDefaultVariantClasses({ theme, variants });
    expect(classes).toEqual({});
  });

  it("should handle undefined variants object", () => {
    variants = undefined;
    const classes = getDefaultVariantClasses({ theme, variants });
    expect(classes).toEqual({
      root: "variant1Value1-classes variant2Value1-classes",
    });
  });
});
