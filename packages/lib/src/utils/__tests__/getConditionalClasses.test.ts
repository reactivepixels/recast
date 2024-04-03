import { getConditionalClasses } from "../getConditionalClasses.js";

describe("getConditionalClasses", () => {
  it("should return an empty object if there are no conditions", () => {
    const styles = { conditionals: undefined };

    const result = getConditionalClasses({ styles });

    expect(result).toEqual({ className: "", rcx: {} });
  });

  it("should return empty object if conditons are not met", () => {
    const modifiers = ["floating"];
    const styles = {
      conditionals: [
        {
          modifiers: "block", // Modifier conditions match defaults above as a string
          className: {
            root: "!bg-green-500",
          },
        },
      ],
    };

    const result = getConditionalClasses({ styles, modifiers });

    expect(result).toEqual({ className: "", rcx: {} });
  });

  it("should return correct classes if conditons are met", () => {
    const modifiers = ["block"];
    const styles = {
      conditionals: [
        {
          modifiers: "block", // Modifier conditions match defaults above as a string
          className: {
            root: "!bg-green-500",
          },
        },
      ],
    };

    const result = getConditionalClasses({ styles, modifiers });

    expect(result).toEqual({ className: "", rcx: { root: "!bg-green-500" } });
  });
});
