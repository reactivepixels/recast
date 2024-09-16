import { describe, it, expect, vi } from "vitest";
import plugin from "./index";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import path from "path";

let html = String.raw;
let css = String.raw;

function run(input, config, pluginToUse = plugin) {
  let { currentTestName } = expect.getState();

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
    };

    let input = css`
      @tailwind utilities;
    `;

    console.log("Starting test run");
    const result = await run(input, config);
    console.log("Test run completed");

    console.log = originalConsoleLog;

    console.log("Captured debug logs:");
    logs.forEach((log) => console.log(log));

    console.log("Generated CSS:");
    console.log(result.css);

    // Your existing assertions...
    expect(result.css).toContain("text-sm");
    expect(result.css).toContain("md:text-lg");

    // New assertions to check if the safelist is generated correctly
    expect(logs.some((log) => log.includes("Adding to safelist"))).toBe(true);
    expect(logs.some((log) => log.includes("md:text-lg"))).toBe(true);
  });
});
