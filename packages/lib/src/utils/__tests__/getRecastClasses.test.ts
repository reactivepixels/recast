import { Styles } from "../../types";
import { getRecastClasses } from "../getRecastClasses";

let mockTheme: undefined | Styles;

jest.mock("../../recastThemeInstance.js", () => {
  return {
    getTheme: jest.fn(() => mockTheme),
  };
});

type BaseTheme = {
  root: string | string[];
};

describe("useRecastClasses", () => {
  it("should return an empty object when no theme is provided", () => {
    mockTheme = undefined;

    const classes = getRecastClasses({
      themekey: "nonexistent",
      variants: {},
      modifiers: [],
    });

    expect(classes).toEqual({});
  });

  it("should return an object with base styles when no variants or modifiers are provided", () => {
    const theme = {
      base: { root: "text-sm font-bold" },
    };

    mockTheme = theme;

    const classes = getRecastClasses<BaseTheme>({
      themekey: "test",
      variants: {},
      modifiers: [],
    });

    expect(classes).toEqual({ root: theme.base.root });
  });

  it("should return an object with base styles and variant classes when variants are provided", () => {
    const theme = {
      base: {
        root: "font-bold",
      },
      variants: {
        size: {
          small: {
            root: "text-sm",
          },
          medium: {
            root: "text-md",
          },
          large: {
            root: "text-lg",
          },
        },
      },
    };

    mockTheme = theme;

    const classes = getRecastClasses<BaseTheme>({
      themekey: "test",
      variants: { size: "small" },
      modifiers: [],
    });

    expect(classes).toEqual({
      root: `${theme.base.root} ${theme.variants.size.small.root}`,
    });
  });

  it("should return an object with base styles and modifier classes when modifiers are provided", () => {
    const theme = {
      base: {
        root: "font-bold",
      },
      modifiers: {
        bold: {
          root: "font-bold",
        },
        italic: {
          root: "font-italic",
        },
      },
    };

    mockTheme = theme;

    const classes = getRecastClasses<BaseTheme>({
      themekey: "test",
      variants: {},
      modifiers: ["bold"],
    });

    expect(classes).toEqual({
      root: `${theme.base.root} ${theme.modifiers.bold.root}`,
    });
  });

  it("should return an object with base styles, variant classes, and modifier classes when both are provided", () => {
    const theme = {
      base: {
        root: "font-bold",
      },
      variants: {
        size: {
          small: {
            root: "text-sm",
          },
          medium: {
            root: "text-md",
          },
          large: {
            root: "text-lg",
          },
        },
      },
      modifiers: {
        bold: {
          root: "font-bold",
        },
        italic: {
          root: "font-italic",
        },
      },
    };

    mockTheme = theme;

    const classes = getRecastClasses<BaseTheme>({
      themekey: "test",
      variants: { size: "small" },
      modifiers: ["bold"],
    });

    expect(classes).toEqual({
      root: `${theme.base.root} ${theme.variants.size.small.root} ${theme.modifiers.bold.root}`,
    });
  });
});
