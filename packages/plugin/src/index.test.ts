import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import plugin from "./index";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import path from "path";
import {
  parseRecastComponents,
  parseRecastUsages,
  parseProps,
  getFilePatterns,
  addToSafelist,
} from "./utils";

let html = String.raw;
let css = String.raw;

function run(input: string, config: any) {
  let { currentTestName } = expect.getState();
  return postcss(
    tailwindcss({
      ...config,
      plugins: [plugin],
    })
  ).process(input, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  });
}

describe("Recast Tailwind Plugin", () => {
  let consoleLogSpy: any;
  let consoleErrorSpy: any;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it("should generate base classes and responsive variants", async () => {
    let config = {
      content: [
        {
          raw: html`
            export const Button = recast(ButtonPrimitive, { base: "bg-blue-500
            text-white", variants: { size: { sm: "text-sm", md: "text-base", lg:
            "text-lg" } } }); <Button size={{ default: "sm", md: "lg" }} />
          `,
        },
      ],
      corePlugins: { preflight: false },
      theme: {
        screens: {
          md: "768px",
        },
      },
    };

    let input = css`
      @tailwind utilities;
    `;

    const result = await run(input, config);

    // Test for base classes
    expect(result.css).toContain(".bg-blue-500");
    expect(result.css).toContain(".text-white");
    expect(result.css).toContain(".text-sm");
    expect(result.css).toContain(".text-base");
    expect(result.css).toContain(".text-lg");

    // Test for responsive variant
    expect(result.css).toContain("@media (min-width: 768px)");
    expect(result.css).toContain(".md\\:text-lg");

    // Test that default variant is not in safelist
    expect(result.css).not.toContain(".sm\\:text-sm");
  });

  describe("parseRecastComponents", () => {
    it("should correctly parse Recast component definitions", () => {
      const content = `
        export const Button = recast(ButtonPrimitive, {
          base: "bg-blue-500 text-white",
          variants: {
            size: {
              sm: "text-sm",
              md: "text-base",
              lg: "text-lg"
            }
          }
        });
      `;
      const result = parseRecastComponents(content);
      expect(result).toEqual({
        Button: {
          base: "bg-blue-500 text-white",
          variants: {
            size: {
              sm: "text-sm",
              md: "text-base",
              lg: "text-lg",
            },
          },
        },
      });
    });

    it("should handle multiple component definitions", () => {
      const content = `
        export const Button = recast(ButtonPrimitive, {
          base: "bg-blue-500 text-white"
        });
        export const Input = recast(InputPrimitive, {
          base: "border rounded"
        });
      `;
      const result = parseRecastComponents(content);
      expect(Object.keys(result)).toHaveLength(2);
      expect(result.Button).toBeDefined();
      expect(result.Input).toBeDefined();
    });

    it("should correctly parse basic Recast component definitions", () => {
      const content = `
        export const Button = recast(ButtonPrimitive, {
          base: "bg-blue-500 text-white",
          variants: {
            size: {
              sm: "text-sm",
              md: "text-base",
              lg: "text-lg"
            }
          }
        });
      `;
      const result = parseRecastComponents(content);
      expect(result).toEqual({
        Button: {
          base: "bg-blue-500 text-white",
          variants: {
            size: {
              sm: "text-sm",
              md: "text-base",
              lg: "text-lg",
            },
          },
        },
      });
    });

    it("should handle multiple component definitions", () => {
      const content = `
        export const Button = recast(ButtonPrimitive, {
          base: "bg-blue-500 text-white"
        });
        export const Input = recast(InputPrimitive, {
          base: "border rounded"
        });
      `;
      const result = parseRecastComponents(content);
      expect(Object.keys(result)).toHaveLength(2);
      expect(result.Button).toBeDefined();
      expect(result.Input).toBeDefined();
    });

    it("should parse components with array-based classes", () => {
      const content = `
        export const Card = recast(CardPrimitive, {
          base: ["bg-white", "shadow-md", "rounded-lg"],
          variants: {
            padding: {
              sm: ["p-2"],
              md: ["p-4"],
              lg: ["p-6"]
            }
          }
        });
      `;
      const result = parseRecastComponents(content);
      expect(result.Card).toEqual({
        base: ["bg-white", "shadow-md", "rounded-lg"],
        variants: {
          padding: {
            sm: ["p-2"],
            md: ["p-4"],
            lg: ["p-6"],
          },
        },
      });
    });

    it("should parse components with object-based classes", () => {
      const content = `
        export const Flex = recast(FlexPrimitive, {
          base: {
            display: "flex",
            flexDirection: "row"
          },
          variants: {
            direction: {
              col: { flexDirection: "column" },
              row: { flexDirection: "row" }
            }
          }
        });
      `;
      const result = parseRecastComponents(content);
      expect(result.Flex).toEqual({
        base: {
          display: "flex",
          flexDirection: "row",
        },
        variants: {
          direction: {
            col: { flexDirection: "column" },
            row: { flexDirection: "row" },
          },
        },
      });
    });

    it("should handle components with const declarations", () => {
      const content = `
        const Text = recast(TextPrimitive, {
          base: "font-sans",
          variants: {
            size: {
              sm: "text-sm",
              md: "text-base",
              lg: "text-lg"
            }
          }
        });
        export { Text };
      `;
      const result = parseRecastComponents(content);
      expect(result.Text).toBeDefined();
      expect(result.Text.base).toBe("font-sans");
    });

    it("should parse components with nested variants", () => {
      const content = `
        export const NestedButton = recast(ButtonPrimitive, {
          base: "bg-blue-500 text-white",
          variants: {
            size: {
              sm: {
                text: "text-sm",
                padding: "px-2 py-1"
              },
              lg: {
                text: "text-lg",
                padding: "px-4 py-2"
              }
            }
          }
        });
      `;
      const result = parseRecastComponents(content);
      expect(result.NestedButton).toEqual({
        base: "bg-blue-500 text-white",
        variants: {
          size: {
            sm: {
              text: "text-sm",
              padding: "px-2 py-1",
            },
            lg: {
              text: "text-lg",
              padding: "px-4 py-2",
            },
          },
        },
      });
    });

    it("should handle components with default export", () => {
      const content = `
        const Button = recast(ButtonPrimitive, {
          base: "bg-blue-500 text-white"
        });
        export default Button;
      `;
      const result = parseRecastComponents(content);
      expect(result.Button).toBeDefined();
      expect(result.Button.base).toBe("bg-blue-500 text-white");
    });
  });

  describe("parseRecastUsages", () => {
    it("should correctly parse Recast component usages", () => {
      const content = `
        <Button size={{ default: "sm", md: "lg" }} />
        <Input type="text" placeholder="Enter your name" />
      `;
      const result = parseRecastUsages(content);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        componentName: "Button",
        props: { size: { default: "sm", md: "lg" } },
      });
      expect(result[1]).toEqual({
        componentName: "Input",
        props: { type: "text", placeholder: "Enter your name" },
      });
    });
  });

  describe("parseProps", () => {
    it("should correctly parse simple props", () => {
      const propsString = 'type="text" placeholder="Enter your name"';
      const result = parseProps(propsString);
      expect(result).toEqual({
        type: "text",
        placeholder: "Enter your name",
      });
    });

    it("should correctly parse complex props", () => {
      const propsString = 'size={{ default: "sm", md: "lg" }} disabled={true}';
      const result = parseProps(propsString);
      expect(result).toEqual({
        size: { default: "sm", md: "lg" },
        disabled: true,
      });
    });
  });

  describe("getFilePatterns", () => {
    it("should handle string input", () => {
      expect(getFilePatterns("src/**/*.tsx")).toEqual(["src/**/*.tsx"]);
    });

    it("should handle array input", () => {
      expect(getFilePatterns(["src/**/*.tsx", "components/**/*.tsx"])).toEqual([
        "src/**/*.tsx",
        "components/**/*.tsx",
      ]);
    });

    it("should handle object input", () => {
      expect(getFilePatterns({ files: ["src/**/*.tsx"] })).toEqual([
        "src/**/*.tsx",
      ]);
    });
  });

  describe("addToSafelist", () => {
    it("should add classes to safelist with prefix", () => {
      const safelist = new Set<string>();
      addToSafelist(safelist, "text-sm text-lg", "md");
      expect(safelist).toEqual(new Set(["md:text-sm", "md:text-lg"]));
    });

    it("should handle array of classes", () => {
      const safelist = new Set<string>();
      addToSafelist(safelist, ["text-sm", "text-lg"], "md");
      expect(safelist).toEqual(new Set(["md:text-sm", "md:text-lg"]));
    });

    it("should handle multiple breakpoints", () => {
      const safelist = new Set<string>();
      addToSafelist(safelist, "text-sm", "sm");
      addToSafelist(safelist, "text-lg", "md");
      expect(safelist).toEqual(new Set(["sm:text-sm", "md:text-lg"]));
    });
  });
});
