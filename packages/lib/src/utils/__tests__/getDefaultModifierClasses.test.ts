import { getDefaultModifierClasses } from "../getDefaultModifierClasses.js";
import { Styles, RecastThemeProps } from "../../types.js";

describe("getDefaultModifierClasses", () => {
  let theme: Styles;
  let modifiers: RecastThemeProps["modifiers"];

  beforeEach(() => {
    theme = {
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
    const classes = getDefaultModifierClasses({ theme, modifiers });
    expect(typeof classes).toBe("object");
  });

  it("should correctly apply default modifiers", () => {
    const classes = getDefaultModifierClasses({ theme, modifiers });
    expect(classes).toEqual({
      root: "modifier1-classes modifier2-classes",
    });
  });

  it("should correctly apply default modifiers", () => {
    theme.defaults = { modifiers: ["modifier1"] };
    const classes = getDefaultModifierClasses({ theme, modifiers });
    expect(classes).toEqual({
      root: "modifier1-classes",
    });
  });

  it("should not apply a default modifier if already specified", () => {
    theme.defaults = { modifiers: ["modifier2"] };
    modifiers = ["modifier2"];
    const classes = getDefaultModifierClasses({ theme, modifiers });
    expect(classes).toEqual({}); // No default modifier applied
  });

  it("should handle undefined theme modifiers object", () => {
    theme.modifiers = undefined;
    const classes = getDefaultModifierClasses({ theme, modifiers });
    expect(classes).toEqual({});
  });

  it("should handle undefined default modifiers object", () => {
    theme.defaults = undefined;
    const classes = getDefaultModifierClasses({ theme, modifiers });
    expect(classes).toEqual({});
  });

  it("should handle undefined modifiers array", () => {
    modifiers = undefined;
    const classes = getDefaultModifierClasses({ theme, modifiers });
    expect(classes).toEqual({ root: "modifier1-classes modifier2-classes" });
  });
});
