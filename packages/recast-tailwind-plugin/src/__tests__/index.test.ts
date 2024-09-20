import { describe, it, expect, vi } from "vitest";
import recastTailwindPlugin from "../index";
import postcss from "postcss";
import tailwindcss, { Config } from "tailwindcss";
import path from "path";
import fs from "fs";

const html = String.raw;
const css = String.raw;

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
    const result = await postcss(
      tailwindcss({
        ...config,
        content: config.content || [], // Ensure content is always defined
        plugins: [
          recastTailwindPlugin,
          () => {
            // Capture the result of the recastTailwindPlugin
            pluginResult = (recastTailwindPlugin as any).__pluginResult;
          },
        ],
      } as Config) // Type assertion to Config
    ).process(input, {
      from: `${path.resolve(__filename)}?test=${currentTestName}`,
    });

    return { result, pluginResult: pluginResult! };
  } catch (error) {
    console.error("Error running plugin:", error);
    throw error;
  }
}

const DEFAULT_SCREEN_SIZE = "768px";

describe("Recast Tailwind Plugin", () => {
  describe("Basic functionality", () => {
    it("should generate base classes and responsive variants", async () => {
      let config = {
        content: [
          {
            raw: html`
              export const Button = recast(ButtonPrimitive, { base: "bg-blue-500
              text-white", variants: { size: { sm: "text-sm", md: "text-base",
              lg: "text-lg" } }, breakpoints: ["md"] });
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

      expect(result.css).toContain(".bg-blue-500");
      expect(result.css).toContain(".text-white");
      expect(result.css).toContain(".text-sm");
      expect(result.css).toContain(".text-lg");
      expect(result.css).toContain("@media (min-width: 768px)");
      expect(result.css).toContain(".md\\:text-lg");
      expect(result.css).not.toContain(".lg\\:text-lg");
    });

    it("should handle multiple components and variants", async () => {
      let config = {
        content: [
          {
            raw: html`
              export const Button = recast(ButtonPrimitive, { base: "bg-blue-500
              text-white", variants: { size: { sm: "text-sm", md: "text-base",
              lg: "text-lg" } }, breakpoints: ["md"] }); export const Input =
              recast(InputPrimitive, { base: "border rounded", variants: {
              variant: { primary: "bg-blue-500", secondary: "bg-red-500" } },
              breakpoints: ["sm"] });
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

      const { result, pluginResult } = await run(config);

      expect(result.css).toContain("@media (min-width: 768px)");
      expect(result.css).toContain(".md\\:text-sm");
      expect(result.css).toContain(".md\\:text-base");
      expect(result.css).toContain(".md\\:text-lg");
      expect(result.css).toContain("@media (min-width: 640px)");
      expect(result.css).toContain(".sm\\:bg-blue-500");
      expect(result.css).toContain(".sm\\:bg-red-500");
    });
  });

  describe("Edge cases", () => {
    it("should handle empty content", async () => {
      const config: Partial<Config> = {
        content: [],
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

    it("should handle content with no Recast components", async () => {
      const config: Partial<Config> = {
        content: [
          {
            raw: html` const Button = () => <button>Click me</button>; `,
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

      expect(pluginResult.extractedComponents).toEqual({});
      expect(pluginResult.safelist).toEqual([]);
    });

    it("should handle components with no variants or breakpoints", async () => {
      const config: Partial<Config> = {
        content: [
          {
            raw: html`
              export const Button = recast(ButtonPrimitive, { base: "bg-blue-500
              text-white" });
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
      expect(pluginResult.safelist).toEqual([]);
    });

    it("should handle malformed Recast component definitions", async () => {
      const config: Partial<Config> = {
        content: [
          {
            raw: html`
              export const Button = recast(ButtonPrimitive, { base: "bg-blue-500
              text-white", variants: { size: { sm: "text-sm", } } );
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
      expect(pluginResult.extractedComponents).not.toHaveProperty("Button");
    });

    it("should handle components with empty variants", async () => {
      let config = {
        content: [
          {
            raw: html`
              export const Button = recast(ButtonPrimitive, { base: "bg-blue-500
              text-white", variants: {} });
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
      expect(pluginResult.safelist).toEqual([]);
    });
  });

  describe("File handling", () => {
    it("should handle file patterns and extract components from files", async () => {
      const tempDir = path.join(__dirname, "temp");
      fs.mkdirSync(tempDir, { recursive: true });
      const tempFile = path.join(tempDir, "TestComponent.tsx");
      fs.writeFileSync(
        tempFile,
        `
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
      `
      );

      let config = {
        content: [path.join(tempDir, "*.tsx")],
        corePlugins: { preflight: false },
        theme: {
          screens: {
            md: DEFAULT_SCREEN_SIZE,
          },
        },
      };

      const { result } = await run(config);

      // Clean up the temporary file and directory
      fs.unlinkSync(tempFile);
      fs.rmdirSync(tempDir);

      expect(result.css).toContain("@media (min-width: 768px)");
      expect(result.css).toContain(".md\\:text-lg");
      expect(result.css).toContain(".md\\:text-sm");
    });
  });

  describe("Error handling", () => {
    it("should log errors encountered during component extraction", async () => {
      // Mock console.warn
      const consoleWarnMock = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      // Create a file with an intentional error
      const tempDir = path.join(__dirname, "temp");
      fs.mkdirSync(tempDir, { recursive: true });
      const tempFile = path.join(tempDir, "ErrorComponent.tsx");
      fs.writeFileSync(
        tempFile,
        `
      export const ErrorComponent = recast(ErrorPrimitive, {
        base: "bg-error-100",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg"
          },
        },
        breakpoints: ["nonexistent"]  // This breakpoint doesn't exist
      });
      `
      );

      const config = {
        content: [path.join(tempDir, "*.tsx")],
        corePlugins: { preflight: false },
        theme: {
          screens: {
            md: DEFAULT_SCREEN_SIZE,
          },
        },
      };

      await run(config);

      // Clean up the temporary file and directory
      fs.unlinkSync(tempFile);
      fs.rmdirSync(tempDir);

      // Check if console.warn was called with the expected message
      expect(consoleWarnMock).toHaveBeenCalledWith(
        expect.stringContaining("Error parsing component ErrorComponent:"),
        expect.any(String)
      );

      // Restore the original console.warn
      consoleWarnMock.mockRestore();
    });
  });
});
