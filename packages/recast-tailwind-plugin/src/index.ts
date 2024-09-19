import plugin from "tailwindcss/plugin";
import fs from "fs";
import type { Config } from "tailwindcss";

interface RecastComponent {
  base?: string | string[];
  variants?: Record<string, Record<string, string | string[]>>;
  breakpoints?: string[];
}
// const recastRegex = /recast\s*\(\s*[\w\d.]+\s*,\s*({[\s\S]*?})\s*\)/g;

export function extractRecastComponents(
  content: string
): Record<string, RecastComponent> {
  const components: Record<string, RecastComponent> = {};
  const regex =
    /(?:export\s+(?:const|let|var|function)|const|let|var|function)\s+(\w+)\s*=\s*recast\s*\(\s*[\w.]+\s*,\s*({[\s\S]*?})\s*\)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const [, componentName, componentDef] = match;
    if (componentName && componentDef) {
      try {
        const processedDef = componentDef
          .replace(/'/g, '"')
          .replace(/(\w+):/g, '"$1":')
          .replace(/,\s*([\]}])/g, "$1"); // Remove trailing commas
        const parsedDef = JSON.parse(processedDef);
        components[componentName] = parsedDef;
      } catch (e) {
        console.error(`Error parsing component ${componentName}:`, e);
      }
    } else {
      console.warn(
        "Matched recast call, but component name or definition is missing"
      );
    }
  }

  return components;
}

function parseComponentDefinition(componentDef: string): RecastComponent {
  // Remove comments
  const cleanDef = componentDef
    .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1")
    .trim();

  // Replace single quotes with double quotes for JSON parsing
  const jsonReadyDef = cleanDef
    .replace(/'/g, '"')
    .replace(/(\w+):/g, '"$1":')
    .replace(/,\s*([\]}])/g, "$1"); // Remove trailing commas

  try {
    return JSON.parse(jsonReadyDef);
  } catch (e) {
    console.error("Error parsing component definition:", e);
    return {};
  }
}

function generateSafelist(
  components: Record<string, RecastComponent>,
  screens: Record<string, string>
): Set<string> {
  const safelist = new Set<string>();

  Object.entries(components).forEach(([componentName, component]) => {
    console.log(`Processing component: ${componentName}`);

    if (component.base) {
      addToSafelist(safelist, component.base);
    }

    if (component.variants) {
      Object.entries(component.variants).forEach(
        ([variantName, variantOptions]) => {
          Object.entries(variantOptions).forEach(([optionName, classes]) => {
            addToSafelist(safelist, classes);
          });
        }
      );
    }

    const breakpoints = component.breakpoints || Object.keys(screens);
    console.log(`Breakpoints for ${componentName}:`, breakpoints);

    breakpoints.forEach((breakpoint) => {
      if (screens[breakpoint]) {
        if (component.base) {
          addToSafelist(safelist, component.base, breakpoint);
        }
        if (component.variants) {
          Object.entries(component.variants).forEach(
            ([variantName, variantOptions]) => {
              Object.entries(variantOptions).forEach(
                ([optionName, classes]) => {
                  addToSafelist(safelist, classes, breakpoint);
                }
              );
            }
          );
        }
      } else {
        console.warn(
          `Warning: Breakpoint "${breakpoint}" is not defined in Tailwind config.`
        );
      }
    });
  });

  return safelist;
}

function addToSafelist(
  safelist: Set<string>,
  classes: string | string[],
  prefix: string = ""
) {
  const classList = Array.isArray(classes) ? classes : classes.split(" ");
  classList.forEach((cls) => {
    const safelistClass = prefix ? `${prefix}:${cls}` : cls;
    safelist.add(safelistClass);
    console.log(`Added to safelist: ${safelistClass}`);
  });
}

const recastTailwindPlugin = plugin(({ addComponents, theme }) => {
  return async ({
    addComponents,
    theme,
    content,
  }: {
    addComponents: (components: any) => void;
    theme: (path: string, defaultValue?: any) => any;
    content: Config["content"];
  }) => {
    const extractedComponents: Record<string, RecastComponent> = {};

    if (Array.isArray(content)) {
      content.forEach((item) => {
        if (typeof item === "string") {
          const fileContent = fs.readFileSync(item, "utf8");
          Object.assign(
            extractedComponents,
            extractRecastComponents(fileContent)
          );
        } else if (typeof item === "object" && item !== null && "raw" in item) {
          Object.assign(extractedComponents, extractRecastComponents(item.raw));
        }
      });
    } else if (typeof content === "object" && content !== null) {
      if ("files" in content && Array.isArray(content.files)) {
        content.files.forEach((file) => {
          if (typeof file === "string") {
            const fileContent = fs.readFileSync(file, "utf8");
            Object.assign(
              extractedComponents,
              extractRecastComponents(fileContent)
            );
          }
        });
      }
      if ("raw" in content && typeof content.raw === "string") {
        Object.assign(
          extractedComponents,
          extractRecastComponents(content.raw)
        );
      }
    }

    console.log(
      "Extracted components:",
      JSON.stringify(extractedComponents, null, 2)
    );

    const screens = theme("screens") as Record<string, string>;
    const safelist = generateSafelist(extractedComponents, screens);

    console.log("Generated safelist:", Array.from(safelist));

    // Add base classes
    const baseClasses = Array.from(safelist)
      .filter((cls) => !cls.includes(":"))
      .reduce((acc, cls) => ({ ...acc, [`.${cls}`]: {} }), {});

    console.log("Base classes:", JSON.stringify(baseClasses, null, 2));

    addComponents(baseClasses);

    // Add responsive variants
    Object.entries(screens).forEach(([breakpoint, minWidth]) => {
      const responsiveClasses = Array.from(safelist)
        .filter((cls) => cls.startsWith(`${breakpoint}:`))
        .reduce(
          (acc, cls) => ({
            ...acc,
            [`.${cls.replace(":", "\\:")}`]: {},
          }),
          {}
        );

      if (Object.keys(responsiveClasses).length > 0) {
        const responsiveComponent = {
          [`@media (min-width: ${minWidth})`]: responsiveClasses,
        };

        console.log(
          `Responsive classes for ${breakpoint}:`,
          JSON.stringify(responsiveComponent, null, 2)
        );

        addComponents(responsiveComponent);
      }
    });
  };
});

export default recastTailwindPlugin;
