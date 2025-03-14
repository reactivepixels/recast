import { describe, it, expect } from "vitest";
import { getModifierClasses } from "../utils/getModifierClasses.js";
import { RECAST_STYLE_PROPS } from "../constants.js";
import type { RelaxedModifierProps, RelaxedStyles } from "../types.js";

describe("getModifierClasses", () => {
  it("should return RECAST_STYLE_PROPS when no modifiers are provided in styles", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      // No modifiers
    };
    const modifiers: RelaxedModifierProps = {
      active: true,
    };

    expect(getModifierClasses({ styles, modifiers })).toEqual(RECAST_STYLE_PROPS);
  });

  it("should return RECAST_STYLE_PROPS when modifiers object is empty", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      modifiers: {
        active: "active-class",
      },
    };
    const modifiers: RelaxedModifierProps = {}; // Empty modifiers

    expect(getModifierClasses({ styles, modifiers })).toEqual(RECAST_STYLE_PROPS);
  });

  it("should apply modifier classes for active modifiers", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      modifiers: {
        active: "active-class",
        disabled: "disabled-class",
      },
    };
    const modifiers: RelaxedModifierProps = {
      active: true,
      disabled: false, // This should be skipped
    };

    const result = getModifierClasses({ styles, modifiers });

    expect(result.className).toContain("active-class");
    expect(result.className).not.toContain("disabled-class");
  });

  it("should skip modifiers that don't exist in styles.modifiers", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      modifiers: {
        active: "active-class",
        // No disabled modifier
      },
    };
    const modifiers: RelaxedModifierProps = {
      active: true,
      disabled: true, // This doesn't exist in styles.modifiers
    };

    const result = getModifierClasses({ styles, modifiers });

    expect(result.className).toContain("active-class");
    expect(result.className.split(" ").length).toBe(1); // Only one class
  });

  it("should handle object modifier values", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      modifiers: {
        size: {
          sm: "size-sm",
          md: "size-md",
          lg: "size-lg",
        },
      },
    };
    const modifiers: RelaxedModifierProps = {
      size: true,
    };

    const result = getModifierClasses({ styles, modifiers });

    // Should include all size classes
    expect(result.cls).toHaveProperty("sm", "size-sm");
    expect(result.cls).toHaveProperty("md", "size-md");
    expect(result.cls).toHaveProperty("lg", "size-lg");
  });

  it("should merge multiple active modifiers correctly", () => {
    const styles: RelaxedStyles = {
      base: "base-class",
      modifiers: {
        active: "active-class",
        disabled: "disabled-class",
        hover: "hover-class",
      },
    };
    const modifiers: RelaxedModifierProps = {
      active: true,
      disabled: true,
      hover: true,
    };

    const result = getModifierClasses({ styles, modifiers });

    // Should include all active modifier classes
    expect(result.className).toContain("active-class");
    expect(result.className).toContain("disabled-class");
    expect(result.className).toContain("hover-class");
  });
});
