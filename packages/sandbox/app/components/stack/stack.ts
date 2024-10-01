import { StackPrimitive } from "@rpxl/recast-primitives";
import { recast } from "@rpxl/recast";

/**
 * Stack Component
 *
 * This component is created using the recast function, which enhances the StackPrimitive
 * with additional styling and variant options.
 *
 * @component
 */
export const Stack = recast(StackPrimitive, {
  /**
   * Default variant settings
   * @property {Object} defaults - The default variant settings
   * @property {Object} defaults.variants - The default variants
   * @property {string} defaults.variants.size - The default size variant (set to "md")
   */
  defaults: { variants: { size: "md" } },

  /**
   * Base styles applied to all instances of the Stack component
   * @property {string} base - The base CSS classes
   */
  base: "flex flex-col",

  /**
   * Variant styles that can be applied to the Stack component
   * @property {Object} variants - The available variants
   * @property {Object} variants.size - Size variants affecting the gap between stack items
   */
  variants: {
    size: {
      /** No gap between items */
      none: "gap-0", // No gap between items
      /** Extra small gap (0.25rem or 4px in Tailwind's default scale) */
      xs: "gap-1", //
      sm: "gap-2", // Small gap (0.5rem or 8px)
      md: "gap-2", // Medium gap (0.5rem or 8px, same as sm in this case)
      lg: "gap-8", // Large gap (2rem or 32px)
      xl: "gap-16", // Extra large gap (4rem or 64px)
      xxl: "gap-24", // Extra extra large gap (6rem or 96px)
    },
  },
});
