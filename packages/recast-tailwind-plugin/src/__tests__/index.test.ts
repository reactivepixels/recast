import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import recastTailwindPlugin, {
  extractRecastComponents,
  generateSafelist,
  getFilePatterns,
  addToSafelist,
  processContent,
} from "../index";
import { DEFAULT_SCREEN_SIZE } from "../constants";
import postcss from "postcss";
import tailwindcss, { Config } from "tailwindcss";
import path from "path";
import fs from "node:fs";
import { glob } from "glob";

vi.mock("node:fs", async () => ({
  default: {
    readFileSync: vi.fn(),
  },
  readFileSync: vi.fn(),
}));

vi.mock("glob", () => ({
  default: {
    sync: vi.fn(),
  },
  glob: {
    sync: vi.fn(),
  },
}));

const html = String.raw;
const css = String.raw;
const js = String.raw;

interface PluginResult {
  extractedComponents: Record<string, any>;
  safelist: string[];
}

async function run(
  config: Partial<Config>
): Promise<{ result: postcss.Result; pluginResult: PluginResult }> {
  const { currentTestName } = expect.getState();
  const input = css`
    @tailwind utilities;
  `;

  let pluginResult: PluginResult;

  try {
    const tailwindInstance = tailwindcss({
      ...config,
      content: config.content || [],
      plugins: [
        recastTailwindPlugin,
        () => {
          pluginResult = (recastTailwindPlugin as any).__pluginResult;
        },
      ],
    } as Config);

    console.log(
      "Tailwind instance config:",
      JSON.stringify(tailwindInstance, null, 2)
    );

    const result = await postcss(tailwindInstance).process(input, {
      from: `${path.resolve(__filename)}?test=${currentTestName}`,
    });

    return { result, pluginResult: pluginResult! };
  } catch (error) {
    console.error("Error running plugin:", error);
    throw error;
  }
}

describe("Recast Tailwind Plugin", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("DEBUG", () => {
    it("typescript component", async () => {
      let config = {
        content: [
          {
            raw: js`
              import { Slot } from "@radix-ui/react-slot";
              import { recast } from "@rpxl/recast";
              import React, { ButtonHTMLAttributes, forwardRef } from "react";

              type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
                asChild?: boolean;
              };

              const Component = forwardRef<HTMLButtonElement, Props>(
                ({ asChild = false, ...props }, ref) => {
                  const Comp = asChild ? Slot : "button";

                  return <Comp ref={ref} {...props} />;
                },
              );

              Component.displayName = "Button";

              export const Button = recast(Component, {
                base: [
                  "flex",
                  "items-center",
                  "justify-start",
                  "disabled:cursor-not-allowed",
                  "transition-all",
                  "text-sm",
                  "uppercase",
                  "relative",
                  "rounded-full",
                  "focus:outline-none",
                ],
                variants: {
                  variant: {
                    primary: [
                      "px-10",
                      "py-4",
                      "text-white",
                      "after:absolute",
                      "after:inset-0",
                      "after:bg-eonarc-mine-shaft",
                      "after:scale-100",
                      "after:transition-all",
                      "after:hover:scale-x-[102%]",
                      "after:transform",
                      "after:ease-in-out",
                      "after:duration-300",
                      "after:-z-1",
                      "after:rounded-full",
                      "after:origin-left",
                      "after:focus:outline-none",
                      "after:focus-visible:ring-4",
                      "after:focus-visible:ring-blue-400",
                    ],
                    ghost: "px-4 py-1",
                  },
                },
              });          
            `,
          },
        ],
        corePlugins: { preflight: false },
        theme: {
          screens: {
            md: DEFAULT_SCREEN_SIZE,
          },
        },
      };

      const { result, pluginResult } = await run(config);
      console.log(pluginResult);
    });
  });

  describe("Basic functionality", () => {
    it("should generate base classes and responsive variants", async () => {
      let config = {
        content: [
          {
            raw: js`
              export const Button = recast(ButtonPrimitive, {
                base: "bg-blue-500 text-white",
                variants: { size: { sm: "text-sm", md: "text-base", lg: "text-lg" } },
                breakpoints: ["md"],
              });
            `,
          },
        ],
        corePlugins: { preflight: false },
        theme: {
          screens: {
            md: DEFAULT_SCREEN_SIZE,
          },
        },
      };

      const { result, pluginResult } = await run(config);

      expect(pluginResult.extractedComponents).toHaveProperty("Button");
      expect(pluginResult.extractedComponents.Button).toEqual({
        base: "bg-blue-500 text-white",
        variants: {
          size: {
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
          },
        },
        breakpoints: ["md"],
      });

      expect(result.css).toContain(".bg-blue-500");
      expect(result.css).toContain(".text-white");
      expect(result.css).toContain(".text-sm");
      expect(result.css).toContain(".text-base");
      expect(result.css).toContain(".text-lg");
      expect(result.css).toContain(".md\\:text-sm");
      expect(result.css).toContain(".md\\:text-base");
      expect(result.css).toContain(".md\\:text-lg");
    });

    it("should handle multiple components and variants", async () => {
      let config = {
        content: [
          {
            raw: js`
            export const Button = recast(ButtonPrimitive, {
              base: "bg-blue-500 text-white",
              variants: { size: { sm: "text-sm", lg: "text-lg" } },
              breakpoints: ["md"],
            });
            export const Input = recast(InputPrimitive, {
              base: "border rounded",
              variants: {
                color: { red: "border-red-500", blue: "border-blue-500" },
              },
              breakpoints: ["lg"],
            });
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

      const { result, pluginResult } = await run(config);

      expect(pluginResult.extractedComponents).toHaveProperty("Button");
      expect(pluginResult.extractedComponents).toHaveProperty("Input");

      expect(result.css).toContain(".bg-blue-500");
      expect(result.css).toContain(".border-red-500");
      expect(result.css).toContain(".md\\:text-sm");
      expect(result.css).toContain(".lg\\:border-blue-500");
    });
  });

  describe("Edge cases", () => {
    it("should handle empty content", async () => {
      let config = {
        content: [{ raw: "" }],
        corePlugins: { preflight: false },
      };

      const { pluginResult } = await run(config);

      expect(pluginResult.extractedComponents).toEqual({});
      expect(pluginResult.safelist).toEqual([]);
    });

    it("should handle content with no Recast components", async () => {
      let config = {
        content: [
          {
            raw: html`
              const regularComponent = () =>
              <div>Regular</div>
              ;
            `,
          },
        ],
        corePlugins: { preflight: false },
      };

      const { pluginResult } = await run(config);

      expect(pluginResult.extractedComponents).toEqual({});
      expect(pluginResult.safelist).toEqual([]);
    });

    it("should handle components with no variants or breakpoints", async () => {
      let config = {
        content: [
          {
            raw: js`
              export const Button = recast(ButtonPrimitive, {
                base: "bg-blue-500 text-white",
              });
            `,
          },
        ],
        corePlugins: { preflight: false },
      };

      const { pluginResult } = await run(config);

      expect(pluginResult.extractedComponents).toHaveProperty("Button");
      expect(pluginResult.extractedComponents.Button).toEqual({
        base: "bg-blue-500 text-white",
        breakpoints: [],
      });
    });

    it("should handle malformed Recast component definitions", async () => {
      let config = {
        content: [
          {
            raw: html`
              export const Button = recast(ButtonPrimitive, "not an object");
            `,
          },
        ],
        corePlugins: { preflight: false },
      };

      const { pluginResult } = await run(config);

      expect(pluginResult.extractedComponents).toEqual({});
      expect(pluginResult.safelist).toEqual([]);
    });

    it("should warn about missing component name or definition", () => {
      const warnSpy = vi.spyOn(console, "warn");
      const content = js`
        const MissingName = recast(Component, {
          base: "bg-blue-500",
        });
        
        const MissingDefinition = recast();
      `;
      extractRecastComponents(content);
      expect(warnSpy).toHaveBeenCalledWith(
        "Error parsing recast component:",
        expect.any(Error)
      );
      warnSpy.mockRestore();
    });

    it("should handle components with empty variants", async () => {
      let config = {
        content: [
          {
            raw: html`
              export const Button = recast(ButtonPrimitive, { base:
              "bg-blue-500", variants: {} });
            `,
          },
        ],
        corePlugins: { preflight: false },
      };

      const { pluginResult } = await run(config);

      expect(pluginResult.extractedComponents).toHaveProperty("Button");
      expect(pluginResult.extractedComponents.Button.variants).toEqual({});
    });
  });

  describe("File handling", () => {
    it("should handle file patterns and extract components from files", async () => {
      const tempFile = `/tmp/Button.tsx`;
      const fileContent = `
        export const Button = recast(ButtonPrimitive, {
          base: "bg-blue-500 text-white",
          variants: {
            size: {
              sm: "text-sm",
              lg: "text-lg"
            }
          },
          breakpoints: ["md"]
        });
      `;

      vi.mocked(glob.sync).mockReturnValue([tempFile]);
      vi.mocked(fs.readFileSync).mockReturnValue(fileContent);

      let config = {
        content: [tempFile],
        corePlugins: { preflight: false },
        theme: {
          screens: {
            md: DEFAULT_SCREEN_SIZE,
          },
        },
      };

      const { pluginResult } = await run(config);

      expect(pluginResult.extractedComponents).toHaveProperty("Button");
      expect(pluginResult.extractedComponents.Button).toEqual({
        base: "bg-blue-500 text-white",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
        },
        breakpoints: ["md"],
      });
    });
  });

  describe("Error handling", () => {
    it("should log warnings for undefined breakpoints", async () => {
      const consoleSpy = vi.spyOn(console, "warn");
      let config = {
        content: [
          {
            raw: html`
              export const Button = recast(ButtonPrimitive, { base:
              "bg-blue-500", variants: { size: { sm: "text-sm" } }, breakpoints:
              ["undefined-breakpoint"] });
            `,
          },
        ],
        corePlugins: { preflight: false },
        theme: {
          screens: {
            md: DEFAULT_SCREEN_SIZE,
          },
        },
      };

      await run(config);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Breakpoint "undefined-breakpoint" is not defined'
        )
      );
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

    it("should handle object input with files array", () => {
      expect(
        getFilePatterns({ files: ["src/**/*.tsx", "components/**/*.tsx"] })
      ).toEqual(["src/**/*.tsx", "components/**/*.tsx"]);
    });

    it("should handle nested object input", () => {
      expect(
        getFilePatterns({
          content: { files: ["src/**/*.tsx", "components/**/*.tsx"] },
        })
      ).toEqual(["src/**/*.tsx", "components/**/*.tsx"]);
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
        breakpoints: [],
      });
    });

    it("should handle classes provided as arrays", () => {
      const content = `
        const Button = recast(ButtonPrimitive, {
          base: ['flex', 'items-center', 'justify-center'],
          variants: {
            variant: {
              primary: 'bg-blue-500 text-white',
              secondary: 'bg-red-500 text-white',
            },
          },
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
        },
        breakpoints: [],
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
    it("should process file pattern", async () => {
      const tempDir = "/tmp/recast-test";
      const tempFile = `${tempDir}/TestComponent.tsx`;
      const fileContent = `
        export const TestComponent = recast(TestPrimitive, {
          base: "bg-gray-100 p-4",
          variants: {
            size: {
              sm: "text-sm",
              lg: "text-lg"
            }
          },
          breakpoints: ["md"]
        });
      `;

      vi.mocked(glob.sync).mockReturnValue([tempFile]);
      vi.mocked(fs.readFileSync).mockReturnValue(fileContent);

      const extractedComponents: Record<string, any> = {};
      const errors: string[] = [];
      await processContent(tempFile, extractedComponents, errors);
      expect(extractedComponents).toHaveProperty("TestComponent");
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

    it("should handle file reading errors", async () => {
      const tempDir = "/tmp/recast-test";
      const tempFile = `${tempDir}/NonExistentComponent.tsx`;

      vi.mocked(glob.sync).mockReturnValue([tempFile]);
      vi.mocked(fs.readFileSync).mockImplementation(() => {
        throw new Error("ENOENT: no such file or directory");
      });

      const extractedComponents: Record<string, any> = {};
      const errors: string[] = [];
      await processContent(tempFile, extractedComponents, errors);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toContain("Error reading file");
    });
  });

  describe("Advanced functionality", () => {
    it("should handle array-based class definitions", async () => {
      let config = {
        content: [
          {
            raw: js`
              export const Button = recast(ButtonPrimitive, { 
                base: ["bg-blue-500", "text-white", "px-4", "py-2"],
                variants: { 
                  size: { 
                    sm: ["text-sm", "py-1"],
                    lg: ["text-lg", "py-3"]
                  } 
                },
                breakpoints: ["md"] 
              });
            `,
          },
        ],
        corePlugins: { preflight: false },
        theme: {
          screens: {
            md: DEFAULT_SCREEN_SIZE,
          },
        },
      };

      const { pluginResult, result } = await run(config);

      expect(pluginResult.extractedComponents).toHaveProperty("Button");
      expect(pluginResult.extractedComponents.Button.base).toBe(
        "bg-blue-500 text-white px-4 py-2"
      );
      expect(pluginResult.extractedComponents.Button.variants.size.sm).toBe(
        "text-sm py-1"
      );
      expect(pluginResult.extractedComponents.Button.variants.size.lg).toBe(
        "text-lg py-3"
      );
      expect(result.css).toContain(".bg-blue-500");
      expect(result.css).toContain(".md\\:text-sm");
      expect(result.css).toContain(".md\\:text-lg");
    });

    it("should handle invalid file patterns gracefully", async () => {
      let config = {
        content: ["non-existent-file.ts"],
        corePlugins: { preflight: false },
        theme: {
          screens: {
            md: DEFAULT_SCREEN_SIZE,
          },
        },
      };

      const { pluginResult } = await run(config);

      expect(pluginResult.extractedComponents).toEqual({});
      expect(pluginResult.safelist).toEqual([]);
    });

    it("should handle complex nested breakpoints", async () => {
      let config = {
        content: [
          {
            raw: js`
              export const Button = recast(ButtonPrimitive, { 
                base: "bg-blue-500 text-white",
                variants: { 
                  size: { 
                    sm: "text-sm",
                    lg: "text-lg"
                  } 
                },
                breakpoints: ["sm", "md", "lg", "xl", "2xl"] 
              });
            `,
          },
        ],
        corePlugins: { preflight: false },
        theme: {
          screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
          },
        },
      };

      const { pluginResult, result } = await run(config);

      expect(pluginResult.extractedComponents).toHaveProperty("Button");
      expect(pluginResult.safelist).toContain("sm:text-sm");
      expect(pluginResult.safelist).toContain("md:text-sm");
      expect(pluginResult.safelist).toContain("lg:text-sm");
      expect(pluginResult.safelist).toContain("xl:text-sm");
      expect(pluginResult.safelist).toContain("2xl:text-sm");
      expect(result.css).toContain("@media (min-width: 640px)");
      expect(result.css).toContain("@media (min-width: 1536px)");
    });
  });
});
