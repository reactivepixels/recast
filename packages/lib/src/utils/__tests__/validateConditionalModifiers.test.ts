import { validateConditionalModifiers } from "../validateConditionalModifiers.js";

describe("validateConditionalModifiers", () => {
  it("should return `true` if there are no modifier conditions", () => {
    const modifiers = undefined;
    const defaults = undefined;

    const condition = {
      modifiers: [], // This is all that matters
      classNames: {
        root: "!bg-green-500",
      },
    };

    const result = validateConditionalModifiers({
      condition,
      modifiers,
      defaults,
    });

    expect(result).toEqual(true);
  });

  it("should return `true` if modifer conditions are met", () => {
    const modifiers = ["floating"];
    const defaults = undefined;

    const condition = {
      modifiers: "floating", // Modifier conditions match above as a string
      classNames: {
        root: "!bg-green-500",
      },
    };

    const result = validateConditionalModifiers({
      condition,
      modifiers,
      defaults,
    });

    expect(result).toEqual(true);
  });

  it("should return `true` if modifer conditions are met with default modifiers", () => {
    const modifiers = undefined;
    const defaults = ["block"];

    const condition = {
      modifiers: "block", // Modifier conditions match defaults above as a string
      classNames: {
        root: "!bg-green-500",
      },
    };

    const result = validateConditionalModifiers({
      condition,
      modifiers,
      defaults,
    });

    expect(result).toEqual(true);
  });

  it("should return `true` if modifer conditions are met with default modifiers as an array", () => {
    const modifiers = undefined;
    const defaults = ["floating", "block"];

    const condition = {
      modifiers: defaults, // Modifier conditions match defaults above
      classNames: {
        root: "!bg-green-500",
      },
    };

    const result = validateConditionalModifiers({
      condition,
      modifiers,
      defaults,
    });

    expect(result).toEqual(true);
  });

  it("should return `true` if modifer conditions are met within an array", () => {
    const modifiers = ["floating", "block"];
    const defaults = undefined;

    const condition = {
      modifiers, // Modifier conditions match above
      classNames: {
        root: "!bg-green-500",
      },
    };

    const result = validateConditionalModifiers({
      condition,
      modifiers,
      defaults,
    });

    expect(result).toEqual(true);
  });
});
