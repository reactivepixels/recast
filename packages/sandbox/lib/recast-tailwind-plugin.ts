import plugin from "tailwindcss/plugin";
import fs from "fs";
import { glob } from "glob";

/**
 * Represents the structure of a Recast component.
 * @interface RecastComponent
 */
interface RecastComponent {
  /** Base classes for the component */
  base: string[];
  /** Variant classes for the component */
  variants: Record<string, Record<string, string | string[]>>;
  /** Breakpoint classes for the component */
  breakpoints: string[];
}

/**
 * Represents the possible types for Tailwind's content configuration.
 * @typedef {string | string[] | { files: string | string[] } | ContentConfig[]} ContentConfig
 */
type ContentConfig =
  | string
  | string[]
  | { files: string | string[] }
  | ContentConfig[];

/**
 * Parses Recast component definitions from a file's content.
 * @param {string} content - The content of the file to parse.
 * @returns {RecastComponent[]} An array of parsed Recast components.
 */
function parseRecastComponents(content: string): RecastComponent[] {
  const regex = /recast\(\w+,\s*({[\s\S]*?})\)/g;
  const components: RecastComponent[] = [];

  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const componentDef = match[1];

    // Convert componentDef string to an object (potentially unsafe, consider alternatives)
    const componentObj = Function(`return ${componentDef}`)();

    components.push({
      base: componentObj.base || [],
      variants: componentObj.variants || {},
      breakpoints: componentObj.breakpoints || [],
    });
  }

  return components;
}

/**
 * Adds a unique item to an array.
 * @param {string[]} arr - The array to add the item to.
 * @param {string} item - The item to add.
 */
function addUnique(arr: string[], item: string) {
  if (!arr.includes(item)) {
    arr.push(item);
  }
}

/**
 * Adds classes to the safelist, handling both string and array inputs.
 * Splits string inputs into individual classes and respects existing responsive prefixes.
 * @param {string[]} safelist - The safelist to add classes to.
 * @param {string | string[]} classes - The classes to add.
 * @param {string} [prefix=''] - Optional prefix to add to each class.
 * @param {string[]} breakpoints - List of valid breakpoints.
 */
function addClassesToSafelist(
  safelist: string[],
  classes: string | string[],
  prefix: string = "",
  breakpoints: string[]
) {
  /**
   * Adds a single class to the safelist, respecting existing responsive prefixes.
   * @param {string} cls - The class to add.
   */
  const addClass = (cls: string) => {
    // Check if the class already has a responsive prefix
    const existingPrefix = cls.split(":")[0];
    if (breakpoints.includes(existingPrefix)) {
      // If the class already has a valid responsive prefix, add it as-is
      addUnique(safelist, cls);
    } else {
      // If no existing prefix or invalid prefix, add the new prefix (if any)
      const prefixedClass = prefix ? `${prefix}:${cls}` : cls;
      addUnique(safelist, prefixedClass);
    }
  };

  if (typeof classes === "string") {
    // If classes is a string, split it into individual classes and add each
    classes.split(/\s+/).forEach(addClass);
  } else if (Array.isArray(classes)) {
    // If classes is an array, process each item
    classes.forEach((cls) => {
      if (typeof cls === "string") {
        // If the array item is a string, split and add each class
        cls.split(/\s+/).forEach(addClass);
      }
      // Note: Non-string array items are ignored
    });
  }
  // Note: If classes is neither a string nor an array, no action is taken
}

/**
 * Extracts file patterns from the Tailwind content configuration.
 * @param {ContentConfig} content - The content configuration.
 * @returns {string[]} An array of file patterns.
 */
function getFilePatterns(content: ContentConfig): string[] {
  if (typeof content === "string") {
    return [content];
  } else if (Array.isArray(content)) {
    return content.flatMap((item) => getFilePatterns(item));
  } else if (typeof content === "object" && content !== null) {
    return getFilePatterns(content.files || []);
  }
  return [];
}

/**
 * Tailwind plugin for processing Recast components and generating a safelist.
 */
export default plugin(function ({ config }) {
  const safelist: string[] = [];

  // Read content configuration from Tailwind config
  const contentConfig = config("content") as ContentConfig;

  const options = {
    ignore: ["**/node_modules/**", "**/build/**", "**/dist/**"],
  };

  const filePatterns = getFilePatterns(contentConfig);

  // Process each file matching the patterns
  filePatterns.forEach((pattern) => {
    const matchingFiles = glob.sync(pattern, options);

    matchingFiles.forEach((file: string) => {
      const content = fs.readFileSync(file, "utf8");
      const recastComponents = parseRecastComponents(content);

      // Generate safelist entries for each component
      recastComponents.forEach((component) => {
        const { base, variants, breakpoints } = component;

        // Add base classes
        addClassesToSafelist(safelist, base, "", breakpoints);

        // Add variant classes
        Object.values(variants).forEach((variantGroup) => {
          Object.values(variantGroup).forEach((classes) => {
            addClassesToSafelist(safelist, classes, "", breakpoints);
          });
        });

        // Add responsive classes
        breakpoints.forEach((breakpoint) => {
          addClassesToSafelist(safelist, base, breakpoint, breakpoints);

          Object.values(variants).forEach((variantGroup) => {
            Object.values(variantGroup).forEach((classes) => {
              addClassesToSafelist(safelist, classes, breakpoint, breakpoints);
            });
          });
        });
      });
    });
  });

  console.log("Generated safelist:", safelist);

  // Add the safelist to the Tailwind config
  const existingSafelist = config("safelist") || [];
  const combinedSafelist = existingSafelist.concat(safelist);
  config().safelist = combinedSafelist.filter(
    (item: string, index: number) => combinedSafelist.indexOf(item) === index
  );
});
