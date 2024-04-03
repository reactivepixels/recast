import { RelaxedStyles, RelaxedVariantProps } from "types.js";

import { getDefaultVariantClasses } from "../getDefaultVariantClasses.js";

describe("getDefaultVariantClasses", () => {
  let styles: RelaxedStyles;
  let variants: RelaxedVariantProps | undefined;

  beforeEach(() => {
    styles = {
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
    const classes = getDefaultVariantClasses({ styles, variants });
    expect(typeof classes).toBe("object");
  });

  it("should correctly apply default variants", () => {
    const classes = getDefaultVariantClasses({ styles, variants });
    expect(classes).toEqual({
      className: "",
      rcx: { root: "variant1Value1-classes variant2Value1-classes" },
    });
  });

  it("should correctly apply default variants when some are already specified", () => {
    variants = { variant1: "variant1Value2" };
    const classes = getDefaultVariantClasses({ styles, variants });
    expect(classes).toEqual({
      className: "",
      rcx: { root: "variant2Value1-classes" },
    });
  });

  it("should not apply a default variant if already specified", () => {
    variants = { variant1: "variant1Value1", variant2: "variant2Value1" };
    const classes = getDefaultVariantClasses({ styles, variants });
    expect(classes).toEqual({ className: "", rcx: {} });
  });

  it("should handle undefined theme variants object", () => {
    styles.variants = undefined;
    const classes = getDefaultVariantClasses({ styles, variants });
    expect(classes).toEqual({ className: "", rcx: {} });
  });

  it("should handle undefined default variants object", () => {
    styles.defaults = undefined;
    const classes = getDefaultVariantClasses({ styles, variants });
    expect(classes).toEqual({ className: "", rcx: {} });
  });

  it("should handle undefined variants object", () => {
    variants = undefined;
    const classes = getDefaultVariantClasses({ styles, variants });
    expect(classes).toEqual({
      className: "",
      rcx: {
        root: "variant1Value1-classes variant2Value1-classes",
      },
    });
  });
});
