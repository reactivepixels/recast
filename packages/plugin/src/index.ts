import plugin from "tailwindcss/plugin";
import {
  parseRecastComponents,
  parseRecastUsages,
  addToSafelist,
  RecastComponent,
  RecastUsage,
  getFilePatterns,
} from "./utils";
import { glob } from "glob";
import fs from "fs";

/**
 * Recast Tailwind Plugin
 *
 * This plugin processes Recast component definitions and usages to generate
 * a safelist of Tailwind CSS classes, ensuring that all necessary classes
 * are included in the final CSS output, even when not explicitly used in the markup.
 */
export default plugin(function ({ config }) {
  const safelist = new Set<string>();
  const components: Record<string, RecastComponent> = {};
  const usages: RecastUsage[] = [];

  const contentConfig = config("content");

  try {
    if (
      Array.isArray(contentConfig.files) &&
      contentConfig.files.length > 0 &&
      contentConfig.files[0].raw
    ) {
      const content = contentConfig.files[0].raw;
      Object.assign(components, parseRecastComponents(content));
      usages.push(...parseRecastUsages(content));
    } else {
      // Handle real-world scenario (not implemented in this example)
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
    if (!component) {
      return;
    }

    // Add base classes to safelist
    if (component.base) {
      addToSafelist(safelist, component.base);
    }

    Object.entries(usage.props).forEach(([propName, propValue]) => {
      const variantGroup = component.variants?.[propName];
      if (!variantGroup) {
        return;
      }

      if (typeof propValue === "object" && propValue !== null) {
        Object.entries(propValue).forEach(([breakpoint, value]) => {
          if (typeof value === "string") {
            const classes = variantGroup[value];
            if (classes) {
              addToSafelist(
                safelist,
                classes,
                breakpoint !== "default" ? breakpoint : ""
              );
            }
          }
        });
      } else if (typeof propValue === "string") {
        const classes = variantGroup[propValue];
        if (classes) {
          addToSafelist(safelist, classes);
        }
      }
    });
  });

  const finalSafelist = Array.from(safelist);
  config().safelist = finalSafelist;
});
