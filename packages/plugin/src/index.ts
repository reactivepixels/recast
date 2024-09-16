import plugin from "tailwindcss/plugin";
import fs from "fs";
import { glob } from "glob";
import {
  parseRecastComponents,
  parseRecastUsages,
  getFilePatterns,
  addToSafelist,
  debugLog,
  RecastComponent,
  RecastUsage,
} from "./utils";

/**
 * Recast Tailwind Plugin
 *
 * This plugin processes Recast component definitions and usages to generate
 * a safelist of Tailwind CSS classes, ensuring that all necessary classes
 * are included in the final CSS output, even when not explicitly used in the markup.
 */
export default plugin(function ({ config }) {
  console.log("Plugin version: 1.0.3");

  /**
   * Set to store unique safelist entries
   * @type {Set<string>}
   */
  const safelist = new Set<string>();

  /**
   * Object to store parsed Recast components
   * @type {Record<string, RecastComponent>}
   */
  const components: Record<string, RecastComponent> = {};

  /**
   * Array to store parsed Recast component usages
   * @type {RecastUsage[]}
   */
  const usages: RecastUsage[] = [];

  /**
   * Content configuration from Tailwind config
   * @type {any}
   */
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
      debugLog("Processing direct content", contentConfig.files[0].raw);
      Object.assign(
        components,
        parseRecastComponents(contentConfig.files[0].raw)
      );
      usages.push(...parseRecastUsages(contentConfig.files[0].raw));
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
          Object.assign(components, parseRecastComponents(content));
          usages.push(...parseRecastUsages(content));
        });
      });
    }
  } catch (error) {
    console.error("Error processing content:", error);
  }

  debugLog("All components", components);
  debugLog("All usages", usages);

  /**
   * Process each usage to generate safelist entries
   */
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

  /**
   * Generate the final sorted safelist
   * @type {string[]}
   */
  const finalSafelist = Array.from(safelist).sort();

  /**
   * Used for unit tests
   */
  debugLog("Final safelist", finalSafelist);

  /**
   * Set the safelist in the Tailwind config
   */
  config().safelist = finalSafelist;
});
