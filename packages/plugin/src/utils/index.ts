import util from "util";

/**
 * Logs debug information with formatted output.
 * @param {string} label - The label for the debug information.
 * @param {any} data - The data to be logged.
 */
export function debugLog(label: string, data: any) {
  console.log(
    `DEBUG - ${label}:`,
    util.inspect(data, { depth: null, colors: true })
  );
}

export interface RecastComponent {
  base?: string | string[] | Record<string, string | string[]>;
  variants?: Record<
    string,
    Record<string, string | string[] | Record<string, string | string[]>>
  >;
}

export interface RecastUsage {
  componentName: string;
  props: Record<string, any>;
}

/**
 * Parses Recast component definitions from the given content.
 * @param {string} content - The content to parse for Recast components.
 * @returns {Record<string, RecastComponent>} An object containing parsed Recast components.
 */
export function parseRecastComponents(
  content: string
): Record<string, RecastComponent> {
  const componentRegex =
    /(?:export\s+(?:const|default)|const)\s+(\w+)\s*=\s*recast\s*\(\s*\w+\s*,\s*({[\s\S]*?})\s*\)/g;
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
        .trim();
      components[componentName] = JSON.parse(processedDef);
    } catch (e) {
      console.error(`Error parsing component ${componentName}:`, e);
    }
  }

  // Handle default exports
  const defaultExportRegex = /export\s+default\s+(\w+)/;
  const defaultExportMatch = content.match(defaultExportRegex);
  if (defaultExportMatch) {
    const componentName = defaultExportMatch[1];
    if (components[componentName]) {
      components["default"] = components[componentName];
    }
  }

  return components;
}

/**
 * Parses Recast component usages from the given content.
 * @param {string} content - The content to parse for Recast usages.
 * @returns {RecastUsage[]} An array of parsed Recast usages.
 */
export function parseRecastUsages(content: string): RecastUsage[] {
  const usageRegex = /<(\w+)([^>]+)>/g;
  return Array.from(content.matchAll(usageRegex)).map(
    ([, componentName, propsString]) => ({
      componentName,
      props: parseProps(propsString),
    })
  );
}

/**
 * Parses props from a string representation.
 * @param {string} propsString - The string containing props to parse.
 * @returns {Record<string, any>} An object containing parsed props.
 */
export function parseProps(propsString: string): Record<string, any> {
  const props: Record<string, any> = {};
  const propsRegex =
    /(\w+)\s*=\s*({[^}]+}|"[^"]*"|{`[^`]+`}|\w+|{true}|{false})/g;

  for (const [, key, value] of propsString.matchAll(propsRegex)) {
    if (["ref", "className", "style"].includes(key)) continue;

    if (value.startsWith("{") && value.endsWith("}")) {
      if (value === "{true}") {
        props[key] = true;
      } else if (value === "{false}") {
        props[key] = false;
      } else {
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
export function getFilePatterns(contentConfig: any): string[] {
  if (typeof contentConfig === "string") return [contentConfig];
  if (Array.isArray(contentConfig))
    return contentConfig.flatMap(getFilePatterns);
  if (typeof contentConfig === "object" && contentConfig !== null) {
    return getFilePatterns(contentConfig.files || []);
  }
  return [];
}

/**
 * Adds classes to the safelist with the given prefix.
 * @param {Set<string>} safelist - The set to add safelist items to.
 * @param {string | string[] | Record<string, string | string[]>} classes - The classes to add to the safelist.
 * @param {string} [prefix=""] - The prefix to apply to the classes.
 */
export function addToSafelist(
  safelist: Set<string>,
  classes: string | string[] | Record<string, string | string[]>,
  prefix: string = ""
): void {
  if (!prefix) return;

  const addClassWithPrefix = (cls: string) => safelist.add(`${prefix}:${cls}`);

  if (typeof classes === "string") {
    classes.split(/\s+/).forEach(addClassWithPrefix);
  } else if (Array.isArray(classes)) {
    classes.forEach(addClassWithPrefix);
  } else if (typeof classes === "object" && classes !== null) {
    Object.entries(classes).forEach(([breakpoint, breakpointClasses]) => {
      if (breakpoint !== "default") {
        addToSafelist(safelist, breakpointClasses, breakpoint);
      }
    });
  }
}
