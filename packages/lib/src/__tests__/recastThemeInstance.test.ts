import RecastThemeInstance from "../recastThemeInstance.js";

describe("RecastThemeInstance", () => {
  it("should set and get a theme", () => {
    const theme = {
      base: {
        root: "some-class",
      },
    };
    RecastThemeInstance.set("button", theme);
    expect(RecastThemeInstance.get("button")).toEqual(theme);
  });

  it("should get all themes when no key is passed", () => {
    const theme1 = {
      base: {
        root: "some-class",
      },
    };
    const theme2 = {
      base: {
        root: "another-class",
      },
    };

    RecastThemeInstance.set("button", theme1);
    RecastThemeInstance.set("input", theme2);

    expect(RecastThemeInstance.get()).toEqual({
      button: theme1,
      input: theme2,
    });
  });
});
