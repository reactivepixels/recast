import { RelaxedModifierProps, RelaxedStyles } from "types.js";

import { getDefaultModifierClasses } from "../getDefaultModifierClasses.js";

describe("getDefaultModifierClasses", () => {
  let styles: RelaxedStyles;
  let modifiers: RelaxedModifierProps | undefined;

  beforeEach(() => {
    styles = {
      defaults: {
        modifiers: ["modifier1", "modifier2"],
      },
      modifiers: {
        modifier1: { root: "modifier1-classes" },
        modifier2: { root: "modifier2-classes" },
        modifier3: { root: "modifier3-classes" },
      },
    };
    modifiers = [];
  });

  it("returns an object", () => {
    const classes = getDefaultModifierClasses({ styles, modifiers });
    expect(typeof classes).toBe("object");
  });

  it("should correctly apply default modifiers", () => {
    const classes = getDefaultModifierClasses({ styles, modifiers });
    expect(classes).toEqual({
      classNames: "",
      rcx: {
        root: "modifier1-classes modifier2-classes",
      },
    });
  });

  it("should correctly apply default modifiers", () => {
    styles.defaults = { modifiers: ["modifier1"] };
    const classes = getDefaultModifierClasses({ styles, modifiers });
    expect(classes).toEqual({
      classNames: "",
      rcx: {
        root: "modifier1-classes",
      },
    });
  });

  it("should not apply a default modifier if already specified", () => {
    styles.defaults = { modifiers: ["modifier2"] };
    modifiers = ["modifier2"];
    const classes = getDefaultModifierClasses({ styles, modifiers });
    expect(classes).toEqual({ classNames: "", rcx: {} }); // No default modifier applied
  });

  it("should handle undefined theme modifiers object", () => {
    styles.modifiers = undefined;
    const classes = getDefaultModifierClasses({ styles, modifiers });
    expect(classes).toEqual({ classNames: "", rcx: {} });
  });

  it("should handle undefined default modifiers object", () => {
    styles.defaults = undefined;
    const classes = getDefaultModifierClasses({ styles, modifiers });
    expect(classes).toEqual({ classNames: "", rcx: {} });
  });

  it("should handle undefined modifiers array", () => {
    modifiers = undefined;
    const classes = getDefaultModifierClasses({ styles, modifiers });
    expect(classes).toEqual({ classNames: "", rcx: { root: "modifier1-classes modifier2-classes" } });
  });
});
