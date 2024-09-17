import plugin from "tailwindcss/plugin";
import type { Rule } from "postcss";
import {
  parseRecastComponents,
  parseRecastUsages,
  addToSafelist,
  RecastComponent,
  RecastUsage,
  getFilePatterns,
} from "./utils";
import { glob } from "glob";
import { readFileSync } from "fs";

/**
 * Recast Tailwind Plugin
 *
 * This plugin extends Tailwind CSS functionality to support Recast components
 * and provides an 'unset' variant for more flexible styling control.
 *
 * @param {Object} helpers - Tailwind plugin helper functions
 * @param {Function} helpers.addVariant - Function to add a new variant
 * @param {Function} helpers.config - Function to access and modify Tailwind config
 */
export default plugin(function ({ addVariant, config }) {
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
      // Test environment
      const content = contentConfig.files[0].raw;
      Object.assign(components, parseRecastComponents(content));
      usages.push(...parseRecastUsages(content));
    } else {
      // Handle real-world scenario
      const filePatterns = getFilePatterns(contentConfig);
      filePatterns.forEach((pattern) => {
        const files = glob.sync(pattern);
        files.forEach((file) => {
          const content = readFileSync(file, "utf8");
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

  /**
   * Adds the 'unset' variant to Tailwind CSS
   *
   * This variant allows for easy "unsetting" of CSS properties at specific breakpoints,
   * which is particularly useful for responsive design and when working with design systems.
   *
   * Use cases:
   * 1. Removing styles at specific breakpoints
   * 2. Creating exceptions to inherited styles
   * 3. Simplifying responsive layouts by unsetting properties instead of overriding
   *
   * Example usage:
   * <div class="font-bold md:unset:font-bold">
   *   This text is bold by default, but font weight is unset on medium screens and above.
   * </div>
   *
   * Note: The 'unset' variant should be used after responsive prefixes (e.g., md:unset:font-bold)
   * to ensure it applies at the correct breakpoint.
   *
   * @param {Object} options - Options passed by Tailwind's plugin system
   * @param {Object} options.container - PostCSS container for rule manipulation
   */
  // @ts-expect-error - works as expected but unsure of typings
  addVariant("unset", ({ container }) => {
    container.walkRules((rule: Rule) => {
      rule.selector = `.unset\\:${rule.selector.slice(1)}`;
      rule.walkDecls((decl) => {
        decl.value = "unset";
      });
    });
  });

  const finalSafelist = Array.from(safelist);
  config().safelist = finalSafelist;
});
