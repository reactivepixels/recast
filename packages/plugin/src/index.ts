import plugin from "tailwindcss/plugin";
import fs from "fs";
import { glob } from "glob";
import util from "util";

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

function debugLog(label: string, data: any) {
  console.log(
    `DEBUG - ${label}:`,
    util.inspect(data, { depth: null, colors: true })
  );
}

export default plugin(function ({ addBase, config }) {
  console.log("Plugin version: 1.0.1");
  debugLog("Plugin called with config", config);

  const safelist = new Set<string>();
  const components: Record<string, any> = {};
  const usages: any[] = [];

  const contentConfig = config("content");
  debugLog("Content config", contentConfig);

  try {
    if (
      Array.isArray(contentConfig) &&
      contentConfig.length > 0 &&
      typeof contentConfig[0] === "object" &&
      contentConfig[0].raw
    ) {
      // Test environment: content is passed directly
      debugLog("Processing direct content", contentConfig[0].raw);
      const parsedComponents = parseRecastComponents(contentConfig[0].raw);
      debugLog("Parsed components", parsedComponents);
      Object.assign(components, parsedComponents);
      const parsedUsages = parseRecastUsages(contentConfig[0].raw);
      debugLog("Parsed usages", parsedUsages);
      usages.push(...parsedUsages);
    } else {
      // Real-world scenario: process file patterns
      const filePatterns = getFilePatterns(contentConfig);
      debugLog("File patterns", filePatterns);

      filePatterns.forEach((pattern) => {
        debugLog("Processing pattern", pattern);
        const files = glob.sync(pattern);
        debugLog("Found files", files);
        files.forEach((file) => {
          debugLog("Processing file", file);
          const content = fs.readFileSync(file, "utf8");
          debugLog("File content", content);
          const parsedComponents = parseRecastComponents(content);
          debugLog("Parsed components", parsedComponents);
          Object.assign(components, parsedComponents);
          const parsedUsages = parseRecastUsages(content);
          debugLog("Parsed usages", parsedUsages);
          usages.push(...parsedUsages);
        });
      });
    }
  } catch (error) {
    console.error("Error processing content:", error);
  }

  debugLog("All components", components);
  debugLog("All usages", usages);

  usages.forEach((usage) => {
    debugLog("Processing usage", usage);
    const component = components[usage.componentName];
    if (!component) {
      debugLog("Component not found", usage.componentName);
      return;
    }

    Object.entries(usage.props).forEach(([propName, propValue]) => {
      debugLog("Processing prop", { propName, propValue });
      const variantGroup = component.variants?.[propName];
      if (!variantGroup) {
        debugLog("Variant group not found", propName);
        return;
      }

      if (typeof propValue === "object" && propValue !== null) {
        Object.entries(propValue).forEach(([breakpoint, value]) => {
          debugLog("Processing breakpoint", { breakpoint, value });
          if (breakpoint !== "default" && typeof value === "string") {
            const classes = variantGroup[value];
            if (classes) {
              debugLog("Adding to safelist", { classes, breakpoint });
              addToSafelist(safelist, classes, breakpoint);
            } else {
              debugLog("Classes not found for variant", { propName, value });
            }
          }
        });
      } else {
        debugLog("Prop value is not an object", propValue);
      }
    });
  });

  const finalSafelist = Array.from(safelist).sort();
  debugLog("Final safelist", finalSafelist);

  config().safelist = finalSafelist;
});

function parseRecastComponents(content: string): Record<string, any> {
  debugLog("Parsing Recast components from content", content);
  const componentRegex =
    /export\s+const\s+(\w+)\s*=\s*recast\s*\(\s*\w+\s*,\s*({[\s\S]*?})\s*\)/g;
  const components: Record<string, any> = {};
  let match;
  while ((match = componentRegex.exec(content)) !== null) {
    const [, componentName, componentDef] = match;
    try {
      const processedDef = componentDef
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')
        .replace(/'/g, '"')
        .replace(/,\s*}/g, "}");
      const componentObj = JSON.parse(processedDef);
      components[componentName] = componentObj;
    } catch (e) {
      console.error(`Error parsing component ${componentName}:`, e);
    }
  }
  debugLog("Parsed Recast components", components);
  return components;
}

function parseRecastUsages(content: string): any[] {
  debugLog("Parsing Recast usages from content", content);
  const usageRegex = /<(\w+)([^>]+)>/g;
  const usages: any[] = [];
  let match;
  while ((match = usageRegex.exec(content)) !== null) {
    const [, componentName, propsString] = match;
    const props = parseProps(propsString);
    usages.push({ componentName, props });
  }
  debugLog("Parsed Recast usages", usages);
  return usages;
}

function parseProps(propsString: string): Record<string, any> {
  debugLog("Parsing props from string", propsString);
  const props: Record<string, any> = {};
  const propsRegex = /(\w+)\s*=\s*({[^}]+}|"[^"]*"|{`[^`]+`}|\w+)/g;
  let match;
  while ((match = propsRegex.exec(propsString)) !== null) {
    const [, key, value] = match;
    if (key === "ref" || key === "className" || key === "style") {
      continue; // Skip non-variant props
    }
    if (value.startsWith("{") && value.endsWith("}")) {
      if (value.startsWith("{`") && value.endsWith("`}")) {
        props[key] = value.slice(2, -2);
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
  debugLog("Parsed props", props);
  return props;
}

function getFilePatterns(contentConfig: any): string[] {
  debugLog("Getting file patterns from content config", contentConfig);
  if (typeof contentConfig === "string") {
    return [contentConfig];
  } else if (Array.isArray(contentConfig)) {
    return contentConfig.flatMap(getFilePatterns);
  } else if (typeof contentConfig === "object" && contentConfig !== null) {
    return getFilePatterns(contentConfig.files || []);
  }
  return [];
}

function addToSafelist(
  safelist: Set<string>,
  classes: string | string[] | Record<string, string | string[]>,
  prefix: string = ""
) {
  debugLog("addToSafelist called with", { classes, prefix });
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
