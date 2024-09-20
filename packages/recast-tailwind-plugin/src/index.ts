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
import { generateSafelist, getFilePatterns, processContent } from "./utils";
import type { RecastComponent, RecastTailwindPlugin } from "./types";

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

export default recastTailwindPlugin;
