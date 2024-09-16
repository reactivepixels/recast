import plugin from "tailwindcss/plugin";
import fs from "fs";
import { glob } from "glob";
import util from "util";

/**
 * Logs debug information with formatted output.
 * @param {string} label - The label for the debug information.
 * @param {any} data - The data to be logged.
 */
function debugLog(label: string, data: any) {
  console.log(
    `DEBUG - ${label}:`,
    util.inspect(data, { depth: null, colors: true })
  );
}

interface RecastComponent {
  base?: string | string[] | Record<string, string | string[]>;
  variants?: Record<
    string,
    Record<string, string | string[] | Record<string, string | string[]>>
  >;
}

interface RecastUsage {
  componentName: string;
  props: Record<string, any>;
}

/**
 * Parses Recast component definitions from the given content.
 * @param {string} content - The content to parse for Recast components.
 * @returns {Record<string, RecastComponent>} An object containing parsed Recast components.
 */
function parseRecastComponents(
  content: string
): Record<string, RecastComponent> {
  const componentRegex =
    /export\s+const\s+(\w+)\s*=\s*recast\s*\(\s*\w+\s*,\s*({[\s\S]*?})\s*\)/g;
  const components: Record<string, RecastComponent> = {};
  let match;
  while ((match = componentRegex.exec(content)) !== null) {
    const [, componentName, componentDef] = match;
    try {
      const processedDef = componentDef
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')
        .replace(/'/g, '"')
        .replace(/,\s*}/g, "}")
        .replace(/\n/g, " ")
        .replace(/\s+/g, " ");
      const componentObj = JSON.parse(processedDef);
      components[componentName] = componentObj;
    } catch (e) {
      console.error(`Error parsing component ${componentName}:`, e);
    }
  }
  return components;
}

/**
 * Parses Recast component usages from the given content.
 * @param {string} content - The content to parse for Recast usages.
 * @returns {RecastUsage[]} An array of parsed Recast usages.
 */
function parseRecastUsages(content: string): RecastUsage[] {
  const usageRegex = /<(\w+)([^>]+)>/g;
  const usages: RecastUsage[] = [];
  let match;
  while ((match = usageRegex.exec(content)) !== null) {
    const [, componentName, propsString] = match;
    const props = parseProps(propsString);
    usages.push({ componentName, props });
  }
  return usages;
}

/**
 * Parses props from a string representation.
 * @param {string} propsString - The string containing props to parse.
 * @returns {Record<string, any>} An object containing parsed props.
 */
function parseProps(propsString: string): Record<string, any> {
  const props: Record<string, any> = {};
  const propsRegex = /(\w+)\s*=\s*({[^}]+}|"[^"]*"|{`[^`]+`}|\w+)/g;
  let match;
  while ((match = propsRegex.exec(propsString)) !== null) {
    const [, key, value] = match;
    if (key === "ref" || key === "className" || key === "style") {
      continue; // Skip non-variant props
    }
    if (value.startsWith("{") && value.endsWith("}")) {
      try {
        const processedValue = value
          .replace(/'/g, '"')
          .replace(/(\w+):/g, '"$1":')
          .replace(/\s+/g, "")
          .replace(/{{/g, "{")
          .replace(/}}/g, "}");
        props[key] = JSON.parse(processedValue);
      } catch (e) {
        console.error(`Error parsing prop ${key}:`, e);
        props[key] = value;
      }
    } else if (value.startsWith('"') && value.endsWith('"')) {
      props[key] = value.slice(1, -1);
    } else {
      props[key] = value;
    }
  }
  return props;
}

/**
 * Extracts file patterns from the content configuration.
 * @param {any} contentConfig - The content configuration object.
 * @returns {string[]} An array of file patterns.
 */
function getFilePatterns(contentConfig: any): string[] {
  if (typeof contentConfig === "string") {
    return [contentConfig];
  } else if (Array.isArray(contentConfig)) {
    return contentConfig.flatMap(getFilePatterns);
  } else if (typeof contentConfig === "object" && contentConfig !== null) {
    return getFilePatterns(contentConfig.files || []);
  }
  return [];
}

/**
 * Adds classes to the safelist with the given prefix.
 * @param {Set<string>} safelist - The set to add safelist items to.
 * @param {string | string[] | Record<string, string | string[]>} classes - The classes to add.
 * @param {string} prefix - The prefix to apply to the classes.
 */
function addToSafelist(
  safelist: Set<string>,
  classes: string | string[] | Record<string, string | string[]>,
  prefix: string = ""
) {
  if (!prefix) return;

  if (typeof classes === "string") {
    classes.split(/\s+/).forEach((cls) => {
      safelist.add(`${prefix}:${cls}`);
    });
  } else if (Array.isArray(classes)) {
    classes.forEach((cls) => {
      safelist.add(`${prefix}:${cls}`);
    });
  } else if (typeof classes === "object" && classes !== null) {
    Object.entries(classes).forEach(([breakpoint, breakpointClasses]) => {
      if (breakpoint !== "default") {
        addToSafelist(safelist, breakpointClasses, breakpoint);
      }
    });
  }
}

export default plugin(function ({ addBase, config }) {
  console.log("Plugin version: 1.0.3");

  const safelist = new Set<string>();
  const components: Record<string, RecastComponent> = {};
  const usages: RecastUsage[] = [];

  const contentConfig = config("content");

  try {
    if (
      typeof contentConfig === "object" &&
      contentConfig !== null &&
      "files" in contentConfig &&
      Array.isArray(contentConfig.files) &&
      contentConfig.files.length > 0 &&
      typeof contentConfig.files[0] === "object" &&
      contentConfig.files[0].raw
    ) {
      // Test environment: content is passed directly
      Object.assign(
        components,
        parseRecastComponents(contentConfig.files[0].raw)
      );
      usages.push(...parseRecastUsages(contentConfig.files[0].raw));
    } else {
      // Real-world scenario: process file patterns
      const filePatterns = getFilePatterns(contentConfig);

      filePatterns.forEach((pattern) => {
        const files = glob.sync(pattern);
        files.forEach((file) => {
          const content = fs.readFileSync(file, "utf8");
          Object.assign(components, parseRecastComponents(content));
          usages.push(...parseRecastUsages(content));
        });
      });
    }
  } catch (error) {
    console.error("Error processing content:", error);
  }

  usages.forEach((usage) => {
    const component = components[usage.componentName];
    if (!component) return;

    Object.entries(usage.props).forEach(([propName, propValue]) => {
      const variantGroup = component.variants?.[propName];
      if (!variantGroup) return;

      if (typeof propValue === "object" && propValue !== null) {
        Object.entries(propValue).forEach(([breakpoint, value]) => {
          if (breakpoint !== "default" && typeof value === "string") {
            const classes = variantGroup[value];
            if (classes) {
              addToSafelist(safelist, classes, breakpoint);
            }
          }
        });
      }
    });
  });

  const finalSafelist = Array.from(safelist).sort();
  debugLog("Final safelist", finalSafelist);

  config().safelist = finalSafelist;
});
