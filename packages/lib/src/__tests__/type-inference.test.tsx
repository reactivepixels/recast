import { describe, it, expect } from "vitest";
import { styles, compose } from "../recast.js";

describe("Type inference", () => {
  it("should preserve type inference for composed styles", () => {
    const baseStyles = styles({
      base: "base-class",
      variants: {
        size: {
          sm: "text-sm",
          lg: "text-lg",
        },
        variant: {
          primary: "bg-blue-500",
          secondary: "bg-gray-500",
        },
      },
      modifiers: {
        disabled: "opacity-50",
        fullWidth: "w-full",
      },
    });

    const composed = compose([baseStyles]);

    // These should have proper type inference
    const result1 = composed.extract({ size: "sm", variant: "primary" });
    const result2 = composed.extract({ disabled: true, fullWidth: true });
    const result3 = composed.extract({ size: "lg", variant: "secondary", disabled: true });

    expect(result1).toContain("base-class");
    expect(result1).toContain("text-sm");
    expect(result1).toContain("bg-blue-500");

    expect(result2).toContain("base-class");
    expect(result2).toContain("opacity-50");
    expect(result2).toContain("w-full");

    expect(result3).toContain("base-class");
    expect(result3).toContain("text-lg");
    expect(result3).toContain("bg-gray-500");
    expect(result3).toContain("opacity-50");
  });
});
