/**
 * @fileoverview Recast Tailwind Plugin
 *
 * This plugin extracts Recast component definitions from your project files
 * and generates a safelist of Tailwind classes based on these components.
 * It integrates with Tailwind CSS to ensure all necessary classes are included
 * in your final CSS output.
 */

import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";
import type { RecastTailwindPlugin } from "./types";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import { glob } from "glob";
import fs from "node:fs";
import type { RecastComponent } from "./types";

/**
 * Recast Tailwind Plugin
 *
 * This plugin extracts Recast component definitions and generates a safelist
 * of Tailwind classes based on these components.
 */
const recastTailwindPlugin: RecastTailwindPlugin = plugin(
  ({ theme, config }) => {
    const contentConfig = config("content") as Config["content"];
    const extractedComponents: Record<string, RecastComponent> = {};
    const errors: string[] = [];

    // Process all content items
    const filePatterns = getFilePatterns(contentConfig);
    filePatterns.forEach((item) =>
      processContent(item, extractedComponents, errors)
    );

    // Generate safelist based on extracted components
    const screens = theme("screens") as Record<string, string>;
    const safelist = generateSafelist(extractedComponents, screens);

    // Set the final safelist in Tailwind config
    const finalSafelist = Array.from(safelist);
    config().safelist = finalSafelist;

    // Expose the result
    (recastTailwindPlugin as RecastTailwindPlugin).__pluginResult = {
      extractedComponents,
      safelist: finalSafelist,
    };
  }
);

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

export function extractRecastComponents(
  content: string
): Record<string, RecastComponent> {
  const components: Record<string, RecastComponent> = {};
  const ast = parse(content, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  traverse(ast, {
    CallExpression(path) {
      if (
        t.isIdentifier(path.node.callee) &&
        path.node.callee.name === "recast"
      ) {
        try {
          const parentPath = path.findParent(
            (p) => p.isVariableDeclarator() || p.isExportNamedDeclaration()
          );
          let componentName: string | null = null;

          if (
            parentPath?.isVariableDeclarator() &&
            t.isIdentifier(parentPath.node.id)
          ) {
            componentName = parentPath.node.id.name;
          } else if (parentPath?.isExportNamedDeclaration()) {
            const declaration = parentPath.node.declaration;
            if (
              t.isVariableDeclaration(declaration) &&
              declaration.declarations.length > 0
            ) {
              const firstDeclaration = declaration.declarations[0];
              if (firstDeclaration && t.isIdentifier(firstDeclaration.id)) {
                componentName = firstDeclaration.id.name;
              }
            }
          }

          if (!componentName) {
            throw new Error("Missing component name");
          }

          if (
            path.node.arguments.length < 2 ||
            !t.isObjectExpression(path.node.arguments[1])
          ) {
            throw new Error("Invalid recast component definition");
          }

          const config = parseRecastConfig(
            path.node.arguments[1] as t.ObjectExpression
          );
          components[componentName] = config;
        } catch (error) {
          console.warn("Error parsing recast component:", error);
        }
      }
    },
  });

  return components;
}

function parseRecastConfig(node: t.ObjectExpression): RecastComponent {
  const component: RecastComponent = {
    base: "",
    breakpoints: [],
  };

  for (const prop of node.properties) {
    if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
      const key = prop.key.name;
      if (key === "base") {
        component.base = parseClassValue(prop.value);
      } else if (key === "variants") {
        component.variants = parseVariants(prop.value);
      } else if (key === "breakpoints") {
        component.breakpoints = parseBreakpoints(prop.value);
      }
    }
  }

  return component;
}

function parseClassValue(node: t.Node): string {
  if (t.isStringLiteral(node)) {
    return node.value;
  } else if (t.isArrayExpression(node)) {
    return node.elements
      .filter((el): el is t.StringLiteral => t.isStringLiteral(el))
      .map((el) => el.value)
      .join(" ");
  }
  return "";
}

function parseVariants(node: t.Node): Record<string, any> {
  if (t.isObjectExpression(node)) {
    const variants: Record<string, any> = {};
    for (const prop of node.properties) {
      if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
        variants[prop.key.name] = parseVariantValue(prop.value);
      }
    }
    return variants;
  }
  return {};
}

function parseVariantValue(node: t.Node): any {
  if (t.isObjectExpression(node)) {
    return parseVariants(node);
  } else if (t.isStringLiteral(node)) {
    return node.value;
  } else if (t.isArrayExpression(node)) {
    return parseClassValue(node);
  }
  return "";
}

function parseBreakpoints(node: t.Node): string[] {
  if (t.isArrayExpression(node)) {
    return node.elements
      .filter((el): el is t.StringLiteral => t.isStringLiteral(el))
      .map((el) => el.value);
  }
  return [];
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

    // Check for undefined breakpoints
    breakpoints.forEach((breakpoint) => {
      if (!screens[breakpoint]) {
        console.warn(
          `Breakpoint "${breakpoint}" is not defined in Tailwind config.`
        );
      }
    });

    // Add base classes
    if (component.base) {
      addToSafelist(safelist, component.base);
      breakpoints.forEach((breakpoint) => {
        if (screens[breakpoint] && component.base) {
          addToSafelist(safelist, component.base, breakpoint);
        }
      });
    }

    if (component.variants) {
      Object.entries(component.variants).forEach(
        ([variantName, variantOptions]) => {
          Object.entries(variantOptions).forEach(([optionName, classes]) => {
            if (typeof classes === "object" && classes !== null) {
              Object.entries(classes).forEach(([subKey, subClasses]) => {
                if (subClasses) {
                  addToSafelist(safelist, subClasses);
                  breakpoints.forEach((breakpoint) => {
                    if (screens[breakpoint]) {
                      addToSafelist(safelist, subClasses, breakpoint);
                    }
                  });
                }
              });
            } else if (classes) {
              addToSafelist(safelist, classes);
              breakpoints.forEach((breakpoint) => {
                if (screens[breakpoint]) {
                  addToSafelist(safelist, classes, breakpoint);
                }
              });
            }
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
  classes: string | string[] | Record<string, string>,
  prefix: string = ""
) {
  let classList: string[];

  if (typeof classes === "string") {
    classList = classes.split(" ");
  } else if (Array.isArray(classes)) {
    classList = classes;
  } else if (typeof classes === "object" && classes !== null) {
    classList = Object.values(classes).flatMap((value) =>
      typeof value === "string" ? value.split(" ") : []
    );
  } else {
    console.warn("Invalid classes input:", classes);
    return;
  }

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
  content: string | { raw: string },
  extractedComponents: Record<string, any>,
  errors: string[]
) {
  if (typeof content === "string") {
    const files = glob.sync(content);

    if (files && files.length > 0) {
      files.forEach((file) => {
        try {
          const fileContent = fs.readFileSync(file, "utf-8");
          const components = extractRecastComponents(fileContent);
          Object.assign(extractedComponents, components);
        } catch (error) {
          errors.push(`Error reading file ${file}: ${error}`);
        }
      });
    } else {
      // console.warn(`No files found matching pattern: ${content}`);
    }
  } else if (typeof content === "object" && content.raw) {
    const components = extractRecastComponents(content.raw);
    Object.assign(extractedComponents, components);
  } else {
    console.warn("Invalid content type:", typeof content);
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
  const files = glob.sync(pattern) || [];
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
) {
  try {
    const content = fs.readFileSync(file, "utf8");
    const extractedFromFile = extractRecastComponents(content);
    Object.assign(extractedComponents, extractedFromFile);
  } catch (error) {
    errors.push(`Error reading file ${file}: ${error}`);
  }
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

export default recastTailwindPlugin;
