import { describe, it, expect, vi } from "vitest";
import {
  extractRecastComponents,
  generateSafelist,
  getFilePatterns,
  addToSafelist,
  processContent,
} from "../utils";
import { glob } from "glob";
import { readFileSync } from "fs";

vi.mock("glob");
vi.mock("fs");

describe("getFilePatterns", () => {
  it("should handle string input", () => {
    const input = "src/**/*.tsx";
    expect(getFilePatterns(input)).toEqual([input]);
  });

  it("should handle array input", () => {
    const input = ["src/**/*.tsx", "components/**/*.tsx"];
    expect(getFilePatterns(input)).toEqual(input);
  });

  it("should handle object input with files array", () => {
    const input = {
      files: [
        "src/**/*.tsx",
        { raw: "export const Button = recast(ButtonPrimitive, {})" },
      ],
    };
    expect(getFilePatterns(input)).toEqual(input.files);
  });

  it("should handle nested object input", () => {
    const input = {
      content: {
        files: [
          "src/**/*.tsx",
          { raw: "export const Button = recast(ButtonPrimitive, {})" },
        ],
      },
    };
    expect(getFilePatterns(input)).toEqual(input.content.files);
  });

  it("should return an empty array for invalid input", () => {
    expect(getFilePatterns(null)).toEqual([]);
    expect(getFilePatterns(undefined)).toEqual([]);
    expect(getFilePatterns({})).toEqual([]);
  });
});

describe("extractRecastComponents", () => {
  it("should extract a simple component", () => {
    const content = `
      export const Button = recast(ButtonPrimitive, {
        base: "bg-blue-500 text-white",
        variants: { size: { sm: "text-sm", lg: "text-lg" } }
      });
    `;
    const result = extractRecastComponents(content);
    expect(result).toHaveProperty("Button");
    expect(result.Button).toHaveProperty("base", "bg-blue-500 text-white");
    expect(result.Button.variants).toHaveProperty("size");
  });

  it("should handle multiple components", () => {
    const content = `
      const Button = recast(ButtonPrimitive, { base: "bg-blue-500" });
      export const Input = recast(InputPrimitive, { base: "border rounded" });
    `;
    const result = extractRecastComponents(content);
    expect(Object.keys(result)).toHaveLength(2);
    expect(result).toHaveProperty("Button");
    expect(result).toHaveProperty("Input");
  });

  it("should ignore non-recast declarations", () => {
    const content = `
      const regularComponent = () => <div>Regular</div>;
      export const Button = recast(ButtonPrimitive, { base: "bg-blue-500" });
    `;
    const result = extractRecastComponents(content);
    expect(Object.keys(result)).toHaveLength(1);
    expect(result).toHaveProperty("Button");
    expect(result).not.toHaveProperty("regularComponent");
  });

  it("should handle components with no variants", () => {
    const content = `
      export const Text = recast(TextPrimitive, { base: "font-sans" });
    `;
    const result = extractRecastComponents(content);
    expect(result.Text).toHaveProperty("base", "font-sans");
    expect(result.Text).not.toHaveProperty("variants");
  });

  it("should handle malformed component definitions gracefully", () => {
    const content = `
      export const Button = recast(ButtonPrimitive, { base: "bg-blue-500", variants: { size: { sm: "text-sm", } );
    `;
    const result = extractRecastComponents(content);
    expect(result).not.toHaveProperty("Button");
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
    const result = extractRecastComponents(content);
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
    const result = extractRecastComponents(content);
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

  it("should warn about missing component name or definition", () => {
    const consoleSpy = vi
      .spyOn(console, "warn")
      .mockImplementation((message) => {});
    const content = `
      export const = recast(MalformedPrimitive, {
        base: "bg-error-100"
      });
      export const ValidComponent = recast(ValidPrimitive, {});
    `;
    const result = extractRecastComponents(content);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Matched recast call, but component name or definition is missing"
    );
    consoleSpy.mockRestore();
  });

  it("should handle classes provided as arrays", () => {
    const content = `
      export const Button = recast(ButtonPrimitive, {
        base: ["flex", "items-center", "justify-center"],
        variants: {
          variant: {
            primary: ["bg-blue-500", "text-white"],
            secondary: "bg-red-500 text-white"
          },
          size: {
            sm: "text-sm",
            lg: ["text-lg", "p-4"]
          }
        }
      });
    `;
    const result = extractRecastComponents(content);
    expect(result.Button).toEqual({
      base: "flex items-center justify-center",
      variants: {
        variant: {
          primary: "bg-blue-500 text-white",
          secondary: "bg-red-500 text-white",
        },
        size: {
          sm: "text-sm",
          lg: "text-lg p-4",
        },
      },
    });
  });
});

describe("generateSafelist", () => {
  it("should generate safelist for components with variants", () => {
    const components = {
      Button: {
        base: "bg-blue-500",
        breakpoints: ["sm", "md"],
        variants: {
          size: { small: "text-sm", large: "text-lg" },
        },
      },
    };
    const screens = { sm: "640px", md: "768px", lg: "1024px" };
    const safelist = generateSafelist(components, screens);
    expect(safelist).toContain("sm:text-sm");
    expect(safelist).toContain("md:text-lg");
    expect(safelist).not.toContain("lg:text-sm");
  });

  it("should handle components without breakpoints", () => {
    const components = {
      Button: {
        variants: {
          weight: {
            bold: "font-bold",
            light: "font-light",
          },
        },
      },
    };
    const screens = { sm: "640px", md: "768px" };
    const safelist = generateSafelist(components, screens);
    expect(safelist).toContain("font-bold");
    expect(safelist).toContain("font-light");
    expect(safelist).not.toContain("sm:font-bold");
    expect(safelist).not.toContain("md:font-light");
  });

  it("should warn about undefined breakpoints", () => {
    const components = {
      Button: {
        base: "bg-blue-500",
        breakpoints: ["xl"],
        variants: { size: { small: "text-sm" } },
      },
    };
    const screens = { lg: "1024px" };
    const consoleSpy = vi.spyOn(console, "warn");
    generateSafelist(components, screens);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Breakpoint "xl" is not defined')
    );
  });
});

describe("addToSafelist", () => {
  it("should add classes to safelist", () => {
    const safelist = new Set<string>();
    addToSafelist(safelist, "bg-blue-500 text-white");
    expect(safelist).toContain("bg-blue-500");
    expect(safelist).toContain("text-white");
  });

  it("should add classes with prefix", () => {
    const safelist = new Set<string>();
    addToSafelist(safelist, "bg-blue-500 text-white", "sm");
    expect(safelist).toContain("sm:bg-blue-500");
    expect(safelist).toContain("sm:text-white");
  });

  it("should handle array input", () => {
    const safelist = new Set<string>();
    addToSafelist(safelist, ["bg-blue-500", "text-white"]);
    expect(safelist).toContain("bg-blue-500");
    expect(safelist).toContain("text-white");
  });
});

describe("processContent", () => {
  it("should process file pattern", () => {
    vi.mocked(glob.sync).mockReturnValue(["file1.ts", "file2.ts"]);
    vi.mocked(readFileSync).mockReturnValue(`
      export const Button = recast(ButtonPrimitive, { base: "bg-blue-500" });
    `);
    const extractedComponents: Record<string, any> = {};
    const errors: string[] = [];
    processContent("src/**/*.ts", extractedComponents, errors);
    expect(extractedComponents).toHaveProperty("Button");
    expect(errors).toHaveLength(0);
  });

  it("should process raw content", () => {
    const rawContent = {
      raw: `export const Input = recast(InputPrimitive, { base: "border rounded" });`,
    };
    const extractedComponents: Record<string, any> = {};
    const errors: string[] = [];
    processContent(rawContent, extractedComponents, errors);
    expect(extractedComponents).toHaveProperty("Input");
    expect(errors).toHaveLength(0);
  });

  it("should handle file reading errors", () => {
    vi.mocked(glob.sync).mockReturnValue(["error.ts"]);
    vi.mocked(readFileSync).mockImplementation(() => {
      throw new Error("File read error");
    });
    const extractedComponents: Record<string, any> = {};
    const errors: string[] = [];
    processContent("error.ts", extractedComponents, errors);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("Error reading file error.ts");
  });
});
