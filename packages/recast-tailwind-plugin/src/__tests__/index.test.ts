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
    vi.restoreAllMocks();
  });

  describe("Component Extraction", () => {
    it("should extract basic component definitions", async () => {
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

      const { pluginResult } = await run(config);

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
    });

    it("should handle multiple components in a single file", async () => {
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

      const { pluginResult } = await run(config);

      expect(pluginResult.extractedComponents).toHaveProperty("Button");
      expect(pluginResult.extractedComponents).toHaveProperty("Input");
    });

    it("should extract components with nested variant structures", async () => {
      let config = {
        content: [
          {
            raw: js`
              import { cn } from "@/utils/cn";
              import { RecastWithClassNameProps, recast } from "@rpxl/recast";
              import React, { forwardRef } from "react";

              type Props = React.HTMLAttributes<HTMLElement> & {
                as?: React.ElementType<
                  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
                >;
              } & RecastWithClassNameProps<{
                  root: string;
                  inner: string;
                }>;

              const Component = forwardRef<HTMLElement, Props>(
                ({ cls, children, as: Tag = "section", className, ...props }, ref) => {
                  return (
                    <Tag className={cn(cls?.root, className)} ref={ref} {...props}>
                      <div className={cls?.inner}>{children}</div>
                    </Tag>
                  );
                },
              );

              Component.displayName = "SectionWrapper";

              export const SectionWrapper = recast(Component, {
                defaults: { variants: { width: "md" } },
                breakpoints: ["md"],
                base: {
                  root: "flex w-full justify-center overflow-hidden",
                  inner: "relative w-full px-4",
                },
                variants: {
                  width: {
                    sm: { root: "bg-blue-500", inner: "max-w-4xl" },
                    md: { root: "bg-red-500", inner: "max-w-6xl" },
                    lg: { root: "bg-green-500", inner: "max-w-7xl" },
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

      const { pluginResult } = await run(config);
      expect(pluginResult.extractedComponents).toHaveProperty("SectionWrapper");
      expect(
        pluginResult.extractedComponents.SectionWrapper.variants
      ).toHaveProperty("width");
      expect(
        pluginResult.extractedComponents.SectionWrapper.variants.width
      ).toHaveProperty("sm");
      expect(
        pluginResult.extractedComponents.SectionWrapper.variants.width.sm
      ).toHaveProperty("root");
      expect(
        pluginResult.extractedComponents.SectionWrapper.variants.width.sm
      ).toHaveProperty("inner");
    });

    it("should handle components with string literal keys", async () => {
      let config = {
        content: [
          {
            raw: js`
              import { recast } from '@rpxl/recast';
              import React, { ElementType, forwardRef } from 'react';

              type Props = React.HTMLAttributes<HTMLElement> & {
                as?: ElementType<
                  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
                >;
              };

              const Component = forwardRef<HTMLHeadingElement, Props>(
                ({ as: Tag = 'div', ...props }, ref) => {
                  return <Tag ref={ref} {...props} />;
                },
              );

              Component.displayName = 'Stack';

              export const Stack = recast(Component, {
                base: 'flex flex-col',
                breakpoints: ['md', 'lg'],
                variants: {
                  gap: {
                    none: 'gap-0',
                    xs: 'gap-1',
                    sm: 'gap-2',
                    md: 'gap-4',
                    lg: 'gap-8',
                    xl: 'gap-3',
                    '2xl': 'gap-24',
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
            lg: "1024px",
          },
        },
      };

      const { pluginResult } = await run(config);

      expect(pluginResult.extractedComponents).toHaveProperty("Stack");
      expect(
        pluginResult.extractedComponents.Stack.variants.gap
      ).toHaveProperty("2xl", "gap-24");
    });

    it("should extract TypeScript components correctly", async () => {
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

      const { pluginResult } = await run(config);
      expect(pluginResult.extractedComponents).toHaveProperty("Button");
      expect(pluginResult.extractedComponents.Button.variants).toHaveProperty(
        "variant"
      );
      expect(
        pluginResult.extractedComponents.Button.variants.variant
      ).toHaveProperty("primary");
      expect(
        pluginResult.extractedComponents.Button.variants.variant
      ).toHaveProperty("ghost");
    });

    it("should handle variant keys that start with a number", async () => {
      let config = {
        content: [
          {
            raw: js`
              import { recast } from '@rpxl/recast';
              import React, { ElementType, forwardRef } from 'react';

              type Props = React.HTMLAttributes<HTMLElement> & {
                as?: ElementType<
                  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
                >;
              };

              const Component = forwardRef<HTMLHeadingElement, Props>(
                ({ as: Tag = 'div', ...props }, ref) => {
                  return <Tag ref={ref} {...props} />;
                },
              );

              Component.displayName = 'Stack';

              export const Stack = recast(Component, {
                base: 'flex flex-col',
                breakpoints: ['md', 'lg'],
                variants: {
                  gap: {
                    none: 'gap-0',
                    xs: 'gap-1',
                    sm: 'gap-2',
                    md: 'gap-4',
                    lg: 'gap-8',
                    xl: 'gap-3',
                    '2xl': 'gap-24',
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
            lg: "1024px",
          },
        },
      };

      const { result, pluginResult } = await run(config);

      expect(
        pluginResult.extractedComponents.Stack.variants.gap
      ).toHaveProperty("2xl", "gap-24");
      expect(result.css).toContain(".md\\:gap-24");
      expect(result.css).toContain(".lg\\:gap-24");
    });
  });

  describe("Safelist Generation", () => {
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

    it("should not include base classes in the safelist", async () => {
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
                breakpoints: ["sm", "md", "lg"] 
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
          },
        },
      };

      const { pluginResult } = await run(config);

      expect(pluginResult.safelist).not.toContain("bg-blue-500");
      expect(pluginResult.safelist).not.toContain("text-white");
      expect(pluginResult.safelist).toContain("sm:text-sm");
      expect(pluginResult.safelist).toContain("md:text-sm");
      expect(pluginResult.safelist).toContain("lg:text-sm");
      expect(pluginResult.safelist).toContain("sm:text-lg");
      expect(pluginResult.safelist).toContain("md:text-lg");
      expect(pluginResult.safelist).toContain("lg:text-lg");
    });
  });

  describe("CSS Generation", () => {
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

  describe("Error Handling and Edge Cases", () => {
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
  });

  describe("File Handling", () => {
    it("should process file patterns and extract components", async () => {
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

  describe("Utility Functions", () => {
    describe("getFilePatterns", () => {
      it("should handle string input", () => {
        expect(getFilePatterns("src/**/*.tsx")).toEqual(["src/**/*.tsx"]);
      });

      it("should handle array input", () => {
        expect(
          getFilePatterns(["src/**/*.tsx", "components/**/*.tsx"])
        ).toEqual(["src/**/*.tsx", "components/**/*.tsx"]);
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
  });
});
