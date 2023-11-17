import { validateRecastStyles } from "../validateRecastStyles";

describe("validateRecastStyles", () => {
  it("should return the styles object when valid variants and modifiers are passed", () => {
    type BaseTheme = {
      root: string | string[];
    };

    const styles = {
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

    const validatedStyles = validateRecastStyles<BaseTheme>()<
      typeof styles.variants,
      typeof styles.modifiers
    >(styles);

    expect(validatedStyles).toEqual(styles);
  });
});
