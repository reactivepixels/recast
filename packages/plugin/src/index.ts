import plugin from "tailwindcss/plugin";
import fs from "fs";
import { glob } from "glob";
import {
  parseRecastComponents,
  parseRecastUsages,
  getFilePatterns,
  addToSafelist,
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
    // Error handling without console.log
  }

  /**
   * Process each usage to generate safelist entries
   */
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

  /**
   * Set the safelist in the Tailwind config
   */
  config().safelist = Array.from(safelist);
});
