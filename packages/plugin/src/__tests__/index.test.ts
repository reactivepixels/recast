import { describe, it, expect } from "vitest";
import recastPlugin from "../index";
import {
  parseRecastComponents,
  parseRecastUsages,
  parseProps,
  getFilePatterns,
  addToSafelist,
} from "../utils";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import path from "path";

let html = String.raw;
let css = String.raw;

function run(config: any) {
  let { currentTestName } = expect.getState();
  let input = css`
    @tailwind utilities;
  `;
  return postcss(
    tailwindcss({
      ...config,
      plugins: [recastPlugin],
    })
  ).process(input, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  });
}

describe("Recast Tailwind Plugin", () => {
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

    const result = await run(config);

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

  it("should handle multiple components and variants", async () => {
    let config = {
      content: [
        {
          raw: html`
            export const Button = recast(ButtonPrimitive, { base: "bg-blue-500
            text-white", variants: { size: { sm: "text-sm", md: "text-base", lg:
            "text-lg" } } }); <Button size={{ default: "sm", md: "lg" }} />
          `,
        },
        {
          raw: html`
            export const Input = recast(InputPrimitive, { base: "border rounded"
            });
            <input type="text" placeholder="Enter your name" />
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

    const result = await run(config);

    // Test for base classes
    expect(result.css).toContain(".bg-blue-500");
    expect(result.css).toContain(".text-white");
    expect(result.css).toContain(".text-sm");
    expect(result.css).toContain(".text-base");
    expect(result.css).toContain(".text-lg");
    expect(result.css).toContain(".border");
    expect(result.css).toContain(".rounded");

    // Test for responsive variant
    expect(result.css).toContain("@media (min-width: 768px)");
    expect(result.css).toContain(".md\\:text-lg");

    // Test that default variant is not in safelist
    expect(result.css).not.toContain(".sm\\:text-sm");
  });

  it("should only generate responsive classes for used variants", async () => {
    let config = {
      content: [
        {
          raw: html`
            export const Button = recast(ButtonPrimitive, { base: "bg-blue-500
            text-white", variants: { size: { sm: "text-sm", md: "text-base", lg:
            "text-lg" }, color: { primary: "bg-blue-500", secondary:
            "bg-green-500" } } });
            <button size="sm" />
          `,
        },
      ],
      corePlugins: { preflight: false },
      theme: {
        screens: {
          md: "768px",
          lg: "1024px",
        },
      },
    };

    const result = await run(config);

    // These classes should be present as they're defined in the component
    expect(result.css).toContain(".text-sm");
    expect(result.css).toContain(".text-base");
    expect(result.css).toContain(".text-lg");
    expect(result.css).toContain(".bg-blue-500");
    expect(result.css).toContain(".bg-green-500");

    // The 'sm' size variant is used, so it shouldn't have responsive variants
    expect(result.css).not.toContain(".md\\:text-sm");
    expect(result.css).not.toContain(".lg\\:text-sm");

    // The 'md' and 'lg' size variants aren't used, so they shouldn't have responsive variants
    expect(result.css).not.toContain(".md\\:text-base");
    expect(result.css).not.toContain(".lg\\:text-base");
    expect(result.css).not.toContain(".md\\:text-lg");
    expect(result.css).not.toContain(".lg\\:text-lg");

    // The color variants aren't used responsively, so they shouldn't have responsive variants
    expect(result.css).not.toContain(".md\\:bg-blue-500");
    expect(result.css).not.toContain(".lg\\:bg-blue-500");
    expect(result.css).not.toContain(".md\\:bg-green-500");
    expect(result.css).not.toContain(".lg\\:bg-green-500");
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

    it("should handle complex variant definitions", () => {
      const content = `
        export const Button = recast(ButtonPrimitive, {
          base: "bg-blue-500 text-white",
          variants: {
            size: {
              sm: "text-sm px-2 py-1",
              md: "text-base px-3 py-2",
              lg: "text-lg px-4 py-3"
            },
            color: {
              primary: "bg-blue-500",
              secondary: "bg-green-500",
              danger: "bg-red-500"
            }
          }
        });
      `;
      const result = parseRecastComponents(content);
      expect(result.Button).toBeDefined();
      expect(result.Button.variants).toBeDefined();
      if (result.Button.variants) {
        expect(result.Button.variants.size).toBeDefined();
        expect(result.Button.variants.color).toBeDefined();
        if (result.Button.variants.size) {
          expect(result.Button.variants.size).toHaveProperty("sm");
          expect(result.Button.variants.size).toHaveProperty("md");
          expect(result.Button.variants.size).toHaveProperty("lg");
        }
        if (result.Button.variants.color) {
          expect(result.Button.variants.color).toHaveProperty("primary");
          expect(result.Button.variants.color).toHaveProperty("secondary");
          expect(result.Button.variants.color).toHaveProperty("danger");
        }
      }
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

    it("should handle usages with nested object props", () => {
      const content = `
        <Button style={{ color: "red", fontSize: { base: "16px", md: "18px" } }} />
      `;
      const result = parseRecastUsages(content);
      expect(result[0].props.style).toEqual({
        color: "red",
        fontSize: { base: "16px", md: "18px" },
      });
    });

    it("should handle usages with array props", () => {
      const content = `
        <List items={["apple", "banana", "cherry"]} />
      `;
      const result = parseRecastUsages(content);
      expect(result[0].props.items).toEqual(["apple", "banana", "cherry"]);
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

    it("should handle boolean-like props", () => {
      const propsString = "disabled={true} required={false} isActive";
      const result = parseProps(propsString);
      expect(result).toEqual({
        disabled: true,
        required: false,
        isActive: true,
      });
    });

    it("should handle props with nested objects", () => {
      const propsString =
        'style={{ color: "red", padding: { top: "10px", bottom: "20px" } }}';
      const result = parseProps(propsString);
      expect(result).toEqual({
        style: { color: "red", padding: { top: "10px", bottom: "20px" } },
      });
    });

    it("should handle props with array values", () => {
      const propsString = 'items={["apple", "banana", "cherry"]}';
      const result = parseProps(propsString);
      expect(result).toEqual({
        items: ["apple", "banana", "cherry"],
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
