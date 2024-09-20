import { glob } from "glob";
import { readFileSync } from "fs";
import type { RecastComponent } from "../types";

/**
 * Extracts file patterns from the Tailwind content configuration.
 * @param contentConfig - The content configuration from Tailwind config.
 * @returns An array of file patterns or raw content objects.
 */
export function getFilePatterns(
  contentConfig: any
): (string | { raw: string })[] {
  if (typeof contentConfig === "string") return [contentConfig];
  if (Array.isArray(contentConfig))
    return contentConfig.flatMap(getFilePatterns);
  if (typeof contentConfig === "object" && contentConfig !== null) {
    if (contentConfig.files) {
      return contentConfig.files;
    }
    if (contentConfig.content) {
      return getFilePatterns(contentConfig.content);
    }
  }
  return [];
}

/**
 * Extracts Recast component definitions from a given content string.
 * @param content - The content string to parse.
 * @returns An object containing extracted Recast components.
 */
export function extractRecastComponents(
  content: string
): Record<string, RecastComponent> {
  const components: Record<string, RecastComponent> = {};
  const regex =
    /(?:export\s+)?(?:const|let|var)?\s*(\w*)\s*=?\s*recast\s*\(\s*[\w.]+\s*(?:,\s*({[\s\S]*?}))?\s*\)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const [, componentName, componentDef] = match;
    if (componentName && componentDef) {
      try {
        const processedDef = componentDef
          .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')
          .replace(/'/g, '"')
          .replace(/,\s*}/g, "}")
          .replace(/\n/g, " ")
          .trim();

        const parsedDef = JSON.parse(processedDef);

        // Handle arrays of strings in base
        if (Array.isArray(parsedDef.base)) {
          parsedDef.base = parsedDef.base.join(" ");
        }

        // Handle arrays of strings in variants
        if (parsedDef.variants) {
          for (const variantKey in parsedDef.variants) {
            for (const optionKey in parsedDef.variants[variantKey]) {
              const value = parsedDef.variants[variantKey][optionKey];
              if (Array.isArray(value)) {
                parsedDef.variants[variantKey][optionKey] = value.join(" ");
              }
            }
          }
        }

        components[componentName] = parsedDef;
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        console.warn(`Error parsing component ${componentName}:`, errorMessage);
      }
    } else {
      console.warn(
        "Matched recast call, but component name or definition is missing"
      );
    }
  }

  return components;
}

/**
 * Generates a safelist of Tailwind classes based on extracted components and screen configurations.
 * @param components - The extracted Recast components.
 * @param screens - The screen configurations from Tailwind config.
 * @returns A Set of safelist classes.
 */
export function generateSafelist(
  components: Record<string, RecastComponent>,
  screens: Record<string, string>
): Set<string> {
  const safelist = new Set<string>();

  Object.entries(components).forEach(([componentName, component]) => {
    const breakpoints = component.breakpoints || [];

    if (component.variants) {
      Object.entries(component.variants).forEach(
        ([variantName, variantOptions]) => {
          Object.entries(variantOptions).forEach(([optionName, classes]) => {
            // Add classes without breakpoint
            addToSafelist(safelist, classes);

            // Add classes with breakpoints
            breakpoints.forEach((breakpoint) => {
              if (screens[breakpoint]) {
                addToSafelist(safelist, classes, breakpoint);
              } else {
                console.warn(
                  `Warning: Breakpoint "${breakpoint}" is not defined in Tailwind config.`
                );
              }
            });
          });
        }
      );
    }
  });

  return safelist;
}

/**
 * Adds classes to the safelist, optionally with a prefix for responsive variants.
 * @param safelist - The Set to add classes to.
 * @param classes - The classes to add, either as a string or an array of strings.
 * @param prefix - Optional prefix for responsive variants.
 */
export function addToSafelist(
  safelist: Set<string>,
  classes: string | string[],
  prefix: string = ""
) {
  const classList = Array.isArray(classes) ? classes : classes.split(" ");

  classList.forEach((cls) => {
    const safelistClass = prefix ? `${prefix}:${cls}` : cls;
    safelist.add(safelistClass);
  });
}

/**
 * Process content and extract Recast components
 * @param item - Content item to process, either a file pattern string or an object with raw content
 * @param extractedComponents - Object to store extracted components
 * @param errors - Array to store any errors encountered during processing
 */
export function processContent(
  item: string | { raw: string },
  extractedComponents: Record<string, RecastComponent>,
  errors: string[]
): void {
  if (typeof item === "string") {
    processFilePattern(item, extractedComponents, errors);
  } else if (isRawContent(item)) {
    processRawContent(item.raw, extractedComponents);
  }
}

/**
 * Process a file pattern and extract Recast components from matching files
 * @param pattern - Glob pattern to match files
 * @param extractedComponents - Object to store extracted components
 * @param errors - Array to store any errors encountered during processing
 */
function processFilePattern(
  pattern: string,
  extractedComponents: Record<string, RecastComponent>,
  errors: string[]
): void {
  const files = glob.sync(pattern);
  files.forEach((file) => processFile(file, extractedComponents, errors));
}

/**
 * Process a single file and extract Recast components
 * @param file - Path to the file to process
 * @param extractedComponents - Object to store extracted components
 * @param errors - Array to store any errors encountered during processing
 */
function processFile(
  file: string,
  extractedComponents: Record<string, RecastComponent>,
  errors: string[]
): void {
  try {
    const content = readFileSync(file, "utf8");
    const extractedFromFile = extractRecastComponents(content);
    Object.assign(extractedComponents, extractedFromFile);
  } catch (error) {
    errors.push(`Error reading file ${file}: ${error}`);
  }
}

/**
 * Process raw content string and extract Recast components
 * @param raw - Raw content string to process
 * @param extractedComponents - Object to store extracted components
 */
function processRawContent(
  raw: string,
  extractedComponents: Record<string, RecastComponent>
): void {
  const extractedFromRaw = extractRecastComponents(raw);
  Object.assign(extractedComponents, extractedFromRaw);
}

/**
 * Type guard to check if an item is a raw content object
 * @param item - Item to check
 * @returns True if the item is a raw content object, false otherwise
 */
function isRawContent(item: unknown): item is { raw: string } {
  return (
    typeof item === "object" &&
    item !== null &&
    "raw" in item &&
    typeof item.raw === "string"
  );
}
