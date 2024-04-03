import { validateConditionalVariants } from "../validateConditionalVariants.js";

describe("validateConditionalVariants", () => {
  it("should return `true` if there are variant conditions are undefined", () => {
    const variants = undefined;
    const defaults = undefined;

    const condition = {
      // Variant conditons are missing
      className: {
        root: "!bg-green-500",
      },
    };

    const result = validateConditionalVariants({
      condition,
      variants,
      defaults,
    });

    expect(result).toEqual(true);
  });

  it("should return `true` if there are no variant conditions", () => {
    const variants = undefined;
    const defaults = undefined;

    const condition = {
      variants: {}, // This is all that matters
      className: {
        root: "!bg-green-500",
      },
    };

    const result = validateConditionalVariants({
      condition,
      variants,
      defaults,
    });

    expect(result).toEqual(true);
  });

  it("should return `true` if variant conditions are met", () => {
    const variants = { intent: "default" };
    const defaults = undefined;

    const condition = {
      variants: { intent: "default" }, // Variant conditions match above as a string
      className: {
        root: "!bg-green-500",
      },
    };

    const result = validateConditionalVariants({
      condition,
      variants,
      defaults,
    });

    expect(result).toEqual(true);
  });

  it("should return `true` if variant conditions are met with default variant", () => {
    const variants = undefined;
    const defaults = { intent: "default" };

    const condition = {
      variants: { intent: "default" }, // Variant conditions match above as a string
      className: {
        root: "!bg-green-500",
      },
    };

    const result = validateConditionalVariants({
      condition,
      variants,
      defaults,
    });

    expect(result).toEqual(true);
  });

  it("should return `true` if variant conditions are met with default variants as an array", () => {
    const variants = undefined;
    const defaults = { intent: "outline" };

    const condition = {
      variants: { intent: ["default", "outline"] }, // Variant conditions match defaults above
      className: {
        root: "!bg-green-500",
      },
    };

    const result = validateConditionalVariants({
      condition,
      variants,
      defaults,
    });

    expect(result).toEqual(true);
  });

  it("should return `true` if variant conditions are met within an array", () => {
    const variants = { intent: "outline" };
    const defaults = undefined;

    const condition = {
      variants: { intent: ["default", "outline"] }, // Variant conditions match above
      className: {
        root: "!bg-green-500",
      },
    };

    const result = validateConditionalVariants({
      condition,
      variants,
      defaults,
    });

    expect(result).toEqual(true);
  });
});
