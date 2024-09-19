import { describe, it, expect, vi } from "vitest";
import recastPlugin from "../index";
import * as RecastExports from "../index";

import postcss from "postcss";
import tailwindcss from "tailwindcss";
import path from "path";

let html = String.raw;
let css = String.raw;

async function run(config: any) {
  let { currentTestName } = expect.getState();
  let input = css`
    @tailwind utilities;
  `;

  const logs: string[] = [];
  const originalConsoleLog = console.log;
  const originalConsoleWarn = console.warn;
  console.log = console.warn = (...args) => {
    logs.push(
      args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
        )
        .join(" ")
    );
  };

  const result = await postcss(
    tailwindcss({
      ...config,
      plugins: [recastPlugin],
    })
  ).process(input, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  });

  console.log = originalConsoleLog;
  console.warn = originalConsoleWarn;

  console.log("Captured logs:");
  logs.forEach((log) => console.log(log));

  return { result, logs };
}

describe("Recast Tailwind Plugin", () => {
  it("should export all expected modules", () => {
    expect(RecastExports).toBeDefined();
    expect(RecastExports.default).toBeDefined();
  });

  it("should generate base classes and responsive variants", async () => {
    let config = {
      content: [
        {
          raw: html`
            export const Button = recast(ButtonPrimitive, {
              base: "bg-blue-500 text-white",
              variants: { size: { sm: "text-sm", md: "text-base", lg: "text-lg" } },
              breakpoints: ["md"]
            });
            <Button size={{ default: "sm", md: "lg" }} />
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

    const { result, logs } = await run(config);

    console.log("Test logs:");
    logs.forEach((log) => console.log(log));

    console.log("Generated CSS:");
    console.log(result.css);

    // Test for base classes
    expect(result.css).toContain(".bg-blue-500");
    expect(result.css).toContain(".text-white");
    expect(result.css).toContain(".text-sm");
    expect(result.css).toContain(".text-lg");

    // Test for responsive variant
    expect(result.css).toContain("@media (min-width: 768px)");
    expect(result.css).toContain(".md\\:text-lg");

    // Test that other breakpoints are not included
    expect(result.css).not.toContain(".lg\\:text-lg");
    expect(result.css).not.toContain(".sm\\:text-sm");
  });

  it("should handle multiple components and variants", async () => {
    let config = {
      content: [
        {
          raw: html`
            export const Button = recast(ButtonPrimitive, {
              base: "bg-blue-500 text-white",
              variants: { size: { sm: "text-sm", md: "text-base", lg: "text-lg" } },
              breakpoints: ["md"]
            });
            <Button size={{ default: "sm", md: "lg" }} />
          `,
        },
        {
          raw: html`
            export const Input = recast(InputPrimitive, { base: "border
            rounded", breakpoints: ["md"] });
            <input type="text" placeholder="Enter your name" />
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

    const { result, logs } = await run(config);

    console.log("Test logs:");
    logs.forEach((log) => console.log(log));

    console.log("Generated CSS:");
    console.log(result.css);

    // Test for base classes
    expect(result.css).toContain(".bg-blue-500");
    expect(result.css).toContain(".text-white");
    expect(result.css).toContain(".text-sm");
    expect(result.css).toContain(".text-lg");
    expect(result.css).toContain(".border");
    expect(result.css).toContain(".rounded");

    // Test for responsive variant
    expect(result.css).toContain("@media (min-width: 768px)");
    expect(result.css).toContain(".md\\:text-lg");
    expect(result.css).toContain(".md\\:border");
    expect(result.css).toContain(".md\\:rounded");

    // Test that other breakpoints are not included
    expect(result.css).not.toContain(".lg\\:text-lg");
    expect(result.css).not.toContain(".sm\\:text-sm");
    expect(result.css).not.toContain(".lg\\:border");
    expect(result.css).not.toContain(".sm\\:border");
    expect(result.css).not.toContain(".lg\\:rounded");
    expect(result.css).not.toContain(".sm\\:rounded");
  });

  it("should only generate responsive classes for used variants", async () => {
    let config = {
      content: [
        {
          raw: html`
            export const Button = recast(ButtonPrimitive, { base: "bg-blue-500
            text-white", variants: { size: { sm: "text-sm", md: "text-base", lg:
            "text-lg" }, color: { primary: "bg-blue-500", secondary:
            "bg-green-500" } }, breakpoints: ["md", "lg"] });
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

    const { result, logs } = await run(config);

    console.log("Test logs:");
    logs.forEach((log) => console.log(log));

    console.log("Generated CSS:");
    console.log(result.css);

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

  it("should respect specified breakpoints", async () => {
    let config = {
      content: [
        {
          raw: html`
            export const Button = recast(ButtonPrimitive, {
              base: "bg-blue-500 text-white",
              variants: { size: { sm: "text-sm", md: "text-base", lg: "text-lg" } },
              breakpoints: ["sm", "lg"]
            });
            <Button size={{ default: "sm", sm: "md", md: "lg", lg: "lg" }} />
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

    const { result, logs } = await run(config);

    console.log("Test logs:");
    logs.forEach((log) => console.log(log));

    console.log("Generated CSS:");
    console.log(result.css);

    // Test for base and default classes
    expect(result.css).toContain(".bg-blue-500");
    expect(result.css).toContain(".text-white");
    expect(result.css).toContain(".text-sm");

    // Test for specified breakpoints
    expect(result.css).toContain(".sm\\:text-base");
    expect(result.css).toContain(".lg\\:text-lg");

    // Test that unspecified breakpoint is not included
    expect(result.css).not.toContain(".md\\:text-lg");
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
          },
          breakpoints: ["md"]
        });
      `;
      const result = RecastExports.extractRecastComponents(content);
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
          breakpoints: ["md"],
        },
      });
    });

    it("should handle multiple component definitions", () => {
      const content = `
        export const Button = recast(ButtonPrimitive, {
          base: "bg-blue-500 text-white",
          breakpoints: ["md"]
        });
        export const Input = recast(InputPrimitive, {
          base: "border rounded",
          breakpoints: ["md"]
        });
      `;
      const result = RecastExports.extractRecastComponents(content);
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
          },
          breakpoints: ["md"]
        });
      `;
      const result = RecastExports.extractRecastComponents(content);
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
          breakpoints: ["md"],
        },
      });
    });

    it("should handle multiple component definitions", () => {
      const content = `
        export const Button = recast(ButtonPrimitive, {
          base: "bg-blue-500 text-white",
          breakpoints: ["md"]
        });
        export const Input = recast(InputPrimitive, {
          base: "border rounded",
          breakpoints: ["md"]
        });
      `;
      const result = RecastExports.extractRecastComponents(content);
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
          },
          breakpoints: ["md"]
        });
      `;
      const result = RecastExports.extractRecastComponents(content);
      expect(result.Card).toEqual({
        base: ["bg-white", "shadow-md", "rounded-lg"],
        variants: {
          padding: {
            sm: ["p-2"],
            md: ["p-4"],
            lg: ["p-6"],
          },
        },
        breakpoints: ["md"],
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
          },
          breakpoints: ["md"]
        });
      `;
      const result = RecastExports.extractRecastComponents(content);
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
        breakpoints: ["md"],
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
          },
          breakpoints: ["md"]
        });
        export { Text };
      `;
      const result = RecastExports.extractRecastComponents(content);
      expect(result.Text).toBeDefined();
      expect(result.Text.base).toBe("font-sans");
      expect(result.Text.breakpoints).toEqual(["md"]);
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
          },
          breakpoints: ["md"]
        });
      `;
      const result = RecastExports.extractRecastComponents(content);
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
        breakpoints: ["md"],
      });
    });

    it("should handle components with default export", () => {
      const content = `
        const Button = recast(ButtonPrimitive, {
          base: "bg-blue-500 text-white",
          breakpoints: ["md"]
        });
        export default Button;
      `;
      const result = RecastExports.extractRecastComponents(content);
      expect(result.Button).toBeDefined();
      expect(result.Button.base).toBe("bg-blue-500 text-white");
      expect(result.Button.breakpoints).toEqual(["md"]);
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
          },
          breakpoints: ["md"]
        });
      `;
      const result = RecastExports.extractRecastComponents(content);
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
      expect(result.Button.breakpoints).toEqual(["md"]);
    });
  });
});
