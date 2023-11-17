import { validateConditionalVariants } from "../validateConditionalVariants";

describe("validateConditionalVariants", () => {
  it("should return `true` if there are variant conditions are undefined", () => {
    const variants = undefined;
    const defaults = undefined;

    const condition = {
      // Variant conditons are missing
      classes: {
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
      classes: {
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
      classes: {
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
      classes: {
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
      classes: {
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
      classes: {
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
