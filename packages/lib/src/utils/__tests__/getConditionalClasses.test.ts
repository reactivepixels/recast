import { getConditionalClasses } from "../getConditionalClasses";

describe("getConditionalClasses", () => {
  it("should return an empty object if there are no conditions", () => {
    const theme = { conditionals: undefined };

    const result = getConditionalClasses({ theme });

    expect(result).toEqual({});
  });

  it("should return empty object if conditons are not met", () => {
    const modifiers = ["floating"];
    const theme = {
      conditionals: [
        {
          modifiers: "block", // Modifier conditions match defaults above as a string
          classes: {
            root: "!bg-green-500",
          },
        },
      ],
    };

    const result = getConditionalClasses({ theme, modifiers });

    expect(result).toEqual({});
  });

  it("should return correct classes if conditons are met", () => {
    const modifiers = ["block"];
    const theme = {
      conditionals: [
        {
          modifiers: "block", // Modifier conditions match defaults above as a string
          classes: {
            root: "!bg-green-500",
          },
        },
      ],
    };

    const result = getConditionalClasses({ theme, modifiers });

    expect(result).toEqual({ root: "!bg-green-500" });
  });
});
