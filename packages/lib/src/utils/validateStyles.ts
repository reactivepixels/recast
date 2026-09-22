import type { RelaxedStyles } from "../types.js";

/**
 * Validation errors that can occur in style configurations
 */
export interface StyleValidationError {
  type: "invalid_variant_value" | "invalid_modifier" | "invalid_default" | "invalid_conditional";
  message: string;
  path?: string;
}

/**
 * Validates a style configuration and returns any validation errors
 * Only runs in development mode
 */
export function validateStyles(styles: RelaxedStyles): StyleValidationError[] {
  const errors: StyleValidationError[] = [];

  // Only validate in development
  if (process.env.NODE_ENV !== "development") {
    return errors;
  }

  // Validate variants
  if (styles.variants) {
    Object.entries(styles.variants).forEach(([variantKey, variantValues]) => {
      if (typeof variantValues === "object" && variantValues !== null) {
        Object.keys(variantValues).forEach((valueKey) => {
          // Check if the variant value has valid class names
          const value = variantValues[valueKey];
          if (value === undefined || value === null) {
            errors.push({
              type: "invalid_variant_value",
              message: `Variant "${variantKey}.${valueKey}" has no class names defined`,
              path: `variants.${variantKey}.${valueKey}`,
            });
          }
        });
      }
    });
  }

  // Validate modifiers
  if (styles.modifiers) {
    Object.entries(styles.modifiers).forEach(([modifierKey, modifierValue]) => {
      if (modifierValue === undefined || modifierValue === null) {
        errors.push({
          type: "invalid_modifier",
          message: `Modifier "${modifierKey}" has no class names defined`,
          path: `modifiers.${modifierKey}`,
        });
      }
    });
  }

  // Validate defaults
  if (styles.defaults) {
    // Validate default variants
    if (styles.defaults.variants && styles.variants) {
      Object.entries(styles.defaults.variants).forEach(([variantKey, defaultValue]) => {
        if (!styles.variants![variantKey]) {
          errors.push({
            type: "invalid_default",
            message: `Default variant "${variantKey}" references non-existent variant`,
            path: `defaults.variants.${variantKey}`,
          });
        } else if (defaultValue && !styles.variants![variantKey][defaultValue]) {
          errors.push({
            type: "invalid_default",
            message: `Default variant value "${defaultValue}" does not exist for variant "${variantKey}"`,
            path: `defaults.variants.${variantKey}`,
          });
        }
      });
    }

    // Validate default modifiers
    if (styles.defaults.modifiers && styles.modifiers) {
      styles.defaults.modifiers.forEach((modifierKey) => {
        if (!styles.modifiers![modifierKey]) {
          errors.push({
            type: "invalid_default",
            message: `Default modifier "${modifierKey}" references non-existent modifier`,
            path: `defaults.modifiers`,
          });
        }
      });
    }
  }

  // Validate conditionals
  if (styles.conditionals) {
    styles.conditionals.forEach((conditional, index) => {
      // Validate conditional variants
      if (conditional.variants && styles.variants) {
        Object.entries(conditional.variants).forEach(([variantKey, variantValues]) => {
          if (!styles.variants![variantKey]) {
            errors.push({
              type: "invalid_conditional",
              message: `Conditional variant "${variantKey}" references non-existent variant`,
              path: `conditionals[${index}].variants.${variantKey}`,
            });
          } else {
            const values = Array.isArray(variantValues) ? variantValues : [variantValues];
            values.forEach((value) => {
              if (value && !styles.variants![variantKey]![value]) {
                errors.push({
                  type: "invalid_conditional",
                  message: `Conditional variant value "${value}" does not exist for variant "${variantKey}"`,
                  path: `conditionals[${index}].variants.${variantKey}`,
                });
              }
            });
          }
        });
      }

      // Validate conditional modifiers
      if (conditional.modifiers && styles.modifiers) {
        const modifierKeys = Array.isArray(conditional.modifiers) ? conditional.modifiers : [conditional.modifiers];

        modifierKeys.forEach((modifierKey) => {
          if (!styles.modifiers![modifierKey]) {
            errors.push({
              type: "invalid_conditional",
              message: `Conditional modifier "${modifierKey}" references non-existent modifier`,
              path: `conditionals[${index}].modifiers`,
            });
          }
        });
      }
    });
  }

  return errors;
}

/**
 * Throws validation errors if any are found
 */
export function validateAndThrow(styles: RelaxedStyles): void {
  const errors = validateStyles(styles);

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => `${error.type}: ${error.message}${error.path ? ` (at ${error.path})` : ""}`)
      .join("\n");

    throw new Error(`Style validation failed:\n${errorMessages}`);
  }
}
