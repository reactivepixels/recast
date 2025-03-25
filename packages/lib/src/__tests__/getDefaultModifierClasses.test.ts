import { describe, it, expect } from "vitest";
import { getDefaultModifierClasses } from "../utils/getDefaultModifierClasses.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import type { RelaxedModifierProps, RelaxedStyles } from "../types.js";

describe("getDefaultModifierClasses", () => {
  it("should return RECAST_STYLE_PROPS when no default modifiers are provided", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      modifiers: {
        active: "active-class",
      },
      // No defaults
    };
    const modifiers: RelaxedModifierProps = {};

    expect(getDefaultModifierClasses({ styles, modifiers })).toEqual(RECAST_STYLE_PROPS);
  });

  it("should return RECAST_STYLE_PROPS when default modifiers array is empty", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      modifiers: {
        active: "active-class",
      },
      defaults: {
        modifiers: [], // Empty array
      },
    };
    const modifiers: RelaxedModifierProps = {};

    expect(getDefaultModifierClasses({ styles, modifiers })).toEqual(RECAST_STYLE_PROPS);
  });

  it("should skip modifiers explicitly set to false", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      modifiers: {
        active: "active-class",
        disabled: "disabled-class",
      },
      defaults: {
        modifiers: ["active", "disabled"],
      },
    };
    const modifiers: RelaxedModifierProps = {
      active: false, // Explicitly set to false
    };

    const result = getDefaultModifierClasses({ styles, modifiers });

    // Should only include disabled class, not active
    expect(result.className).toContain("disabled-class");
    expect(result.className).not.toContain("active-class");
  });

  it("should skip modifiers explicitly set to true", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      modifiers: {
        active: "active-class",
        disabled: "disabled-class",
      },
      defaults: {
        modifiers: ["active", "disabled"],
      },
    };
    const modifiers: RelaxedModifierProps = {
      active: true, // Explicitly set to true
    };

    const result = getDefaultModifierClasses({ styles, modifiers });

    // Should only include disabled class, not active (since active is explicitly set)
    expect(result.className).toContain("disabled-class");
    expect(result.className).not.toContain("active-class");
  });

  it("should skip modifiers that don't exist in styles.modifiers", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      modifiers: {
        active: "active-class",
        // No disabled modifier
      },
      defaults: {
        modifiers: ["active", "disabled"], // disabled doesn't exist in modifiers
      },
    };
    const modifiers: RelaxedModifierProps = {};

    const result = getDefaultModifierClasses({ styles, modifiers });

    // Should only include active class
    expect(result.className).toContain("active-class");
  });

  it("should handle object modifier values", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      modifiers: {
        size: "size-class", // String value instead of object
      },
      defaults: {
        modifiers: ["size"],
      },
    };
    const modifiers: RelaxedModifierProps = {};

    const result = getDefaultModifierClasses({ styles, modifiers });

    // Should include the default size class
    expect(result.className).toContain("size-class");
  });

  it("should merge multiple default modifiers correctly", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      modifiers: {
        active: "active-class",
        disabled: "disabled-class",
        hover: "hover-class",
      },
      defaults: {
        modifiers: ["active", "disabled", "hover"],
      },
    };
    const modifiers: RelaxedModifierProps = {};

    const result = getDefaultModifierClasses({ styles, modifiers });

    // Should include all default modifier classes
    expect(result.className).toContain("active-class");
    expect(result.className).toContain("disabled-class");
    expect(result.className).toContain("hover-class");
  });
});
