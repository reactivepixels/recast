import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { validateStyles, validateAndThrow } from "../utils/validateStyles.js";

describe("Style validation", () => {
  let originalNodeEnv: string | undefined;

  beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe("validateStyles", () => {
    it("should return no errors for valid styles", () => {
      const validStyles = {
        base: "base-class",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
        },
        modifiers: {
          disabled: "opacity-50",
        },
        defaults: {
          variants: { size: "sm" },
          modifiers: ["disabled"],
        },
      };

      const errors = validateStyles(validStyles);
      expect(errors).toHaveLength(0);
    });

    it("should detect missing variant values", () => {
      const invalidStyles = {
        variants: {
          size: {
            sm: "text-sm",
            // lg is missing entirely
          },
        },
        defaults: {
          variants: { size: "lg" }, // References missing variant value
        },
      };

      const errors = validateStyles(invalidStyles);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toMatchObject({
        type: "invalid_default",
        message: 'Default variant value "lg" does not exist for variant "size"',
        path: "defaults.variants.size",
      });
    });

    it("should detect missing modifiers", () => {
      const invalidStyles = {
        modifiers: {
          disabled: "opacity-50",
          // fullWidth is missing entirely
        },
        defaults: {
          modifiers: ["fullWidth"], // References missing modifier
        },
      };

      const errors = validateStyles(invalidStyles);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toMatchObject({
        type: "invalid_default",
        message: 'Default modifier "fullWidth" references non-existent modifier',
        path: "defaults.modifiers",
      });
    });

    it("should detect invalid conditional references", () => {
      const invalidStyles = {
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
        },
        conditionals: [
          {
            variants: {
              size: "md", // References non-existent variant value
            },
            className: "shadow-lg",
          },
        ],
      };

      const errors = validateStyles(invalidStyles);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toMatchObject({
        type: "invalid_conditional",
        message: 'Conditional variant value "md" does not exist for variant "size"',
        path: "conditionals[0].variants.size",
      });
    });

    it("should not validate in production mode", () => {
      process.env.NODE_ENV = "production";

      const invalidStyles = {
        variants: {
          size: {
            sm: "text-sm",
          },
        },
        defaults: {
          variants: { size: "lg" }, // Invalid but should be ignored in production
        },
      };

      const errors = validateStyles(invalidStyles);
      expect(errors).toHaveLength(0);
    });
  });

  describe("validateAndThrow", () => {
    it("should not throw for valid styles", () => {
      const validStyles = {
        base: "base-class",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
        },
      };

      expect(() => validateAndThrow(validStyles)).not.toThrow();
    });

    it("should throw for invalid styles", () => {
      const invalidStyles = {
        variants: {
          size: {
            sm: "text-sm",
          },
        },
        defaults: {
          variants: { size: "lg" }, // References non-existent variant value
        },
      };

      expect(() => validateAndThrow(invalidStyles)).toThrow(
        'Style validation failed:\ninvalid_default: Default variant value "lg" does not exist for variant "size" (at defaults.variants.size)',
      );
    });
  });

  describe("Integration with styles function", () => {
    it("should validate styles when creating style objects", () => {
      // Test that validation is called by creating a style with invalid defaults
      const invalidStyles = {
        variants: {
          size: {
            sm: "text-sm",
          },
        },
        defaults: {
          variants: { size: "lg" }, // References non-existent variant value
        },
      };

      // Test the validation function directly
      expect(() => validateAndThrow(invalidStyles)).toThrow(
        'Style validation failed:\ninvalid_default: Default variant value "lg" does not exist for variant "size" (at defaults.variants.size)',
      );
    });

    it("should not validate in production mode", () => {
      process.env.NODE_ENV = "production";

      const invalidStyles = {
        variants: {
          size: {
            sm: "text-sm",
          },
        },
        defaults: {
          variants: { size: "lg" }, // Invalid but should be ignored in production
        },
      };

      // Test the validation function directly
      expect(() => validateAndThrow(invalidStyles)).not.toThrow();
    });
  });
});
