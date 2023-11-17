import { getModifierClasses } from "../getModifierClasses.js";
import { Styles, RecastThemeProps } from "../../types.js";

describe("getModifierClasses", () => {
  let theme: Styles;
  let modifiers: RecastThemeProps["modifiers"];

  beforeEach(() => {
    theme = {
      modifiers: {
        modifier1: { root: "modifier1-classes" },
        modifier2: { root: "modifier2-classes" },
      },
    };
    modifiers = ["modifier1", "modifier2"];
  });

  it("returns an object", () => {
    const classes = getModifierClasses({ theme, modifiers });
    expect(typeof classes).toBe("object");
  });

  it("should correctly generates classes based on theme and modifiers", () => {
    const classes = getModifierClasses({ theme, modifiers });
    expect(classes).toEqual({
      root: "modifier1-classes modifier2-classes",
    });
  });

  it("should handle undefined modifiers array", () => {
    modifiers = undefined;
    const classes = getModifierClasses({ theme, modifiers });
    expect(classes).toEqual({});
  });

  it("should handle undefined theme modifiers object", () => {
    theme.modifiers = undefined;
    const classes = getModifierClasses({ theme, modifiers });
    expect(classes).toEqual({});
  });
});
