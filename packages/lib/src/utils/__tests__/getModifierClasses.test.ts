import { RelaxedModifierProps, RelaxedStyles } from "types.js";

import { getModifierClasses } from "../getModifierClasses.js";

describe("getModifierClasses", () => {
  let styles: RelaxedStyles;
  let modifiers: RelaxedModifierProps | undefined;

  beforeEach(() => {
    styles = {
      modifiers: {
        modifier1: { root: "modifier1-classes" },
        modifier2: { root: "modifier2-classes" },
      },
    };
    modifiers = ["modifier1", "modifier2"];
  });

  it("returns an object", () => {
    const classes = getModifierClasses({ styles, modifiers });
    expect(typeof classes).toBe("object");
  });

  it("should correctly generates classes based on theme and modifiers", () => {
    const classes = getModifierClasses({ styles, modifiers });
    expect(classes).toEqual({
      className: "",
      rcx: {
        root: "modifier1-classes modifier2-classes",
      },
    });
  });

  it("should handle undefined modifiers array", () => {
    modifiers = undefined;
    const classes = getModifierClasses({ styles, modifiers });
    expect(classes).toEqual({ className: "", rcx: {} });
  });

  it("should handle undefined theme modifiers object", () => {
    styles.modifiers = undefined;
    const classes = getModifierClasses({ styles, modifiers });
    expect(classes).toEqual({ className: "", rcx: {} });
  });
});
