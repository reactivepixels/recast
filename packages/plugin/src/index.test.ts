import { describe, it, expect, vi } from "vitest";
import plugin from "./index";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import path from "path";

let html = String.raw;
let css = String.raw;

function run(config, pluginToUse = plugin) {
  let { currentTestName } = expect.getState();
  let input = css`
    @tailwind utilities;
  `;

  return postcss(
    tailwindcss({
      ...config,
      plugins: [pluginToUse],
    })
  ).process(input, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  });
}

describe("Recast Tailwind Plugin", () => {
  it("should generate base classes and responsive variants", async () => {
    const logs: string[] = [];
    const originalConsoleLog = console.log;
    console.log = (...args: any[]) => {
      logs.push(args.join(" "));
      originalConsoleLog(...args);
    };

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

    // Test for safelist generation
    expect(logs.some((log) => log.includes("md:text-lg"))).toBe(true);

    // Test complete safelist
    const safelistLog = logs.find((log) => log.includes("Final safelist"));
    expect(safelistLog).toBeDefined();
    expect(safelistLog).toContain("md:text-lg");
    expect(safelistLog).not.toContain("text-sm");
  });
});
