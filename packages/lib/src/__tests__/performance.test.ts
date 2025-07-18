import { describe, it, expect, vi, beforeEach } from "vitest";
import { memoize, memoizeWithLRU, withPerformanceMonitoring } from "../utils/common.js";
import { getRecastClasses } from "../utils/getRecastClasses.js";
import { mergeStringClassNames } from "../utils/mergeClassNames.js";
import type { RelaxedStyles, RelaxedVariantProps, RelaxedModifierProps } from "../types.js";

describe("Performance Optimizations", () => {
  describe("memoize", () => {
    it("should cache function results", () => {
      const fn = vi.fn((a: number, b: number) => a + b);
      const memoizedFn = memoize(fn);

      // First call should execute the function
      expect(memoizedFn(1, 2)).toBe(3);
      expect(fn).toHaveBeenCalledTimes(1);

      // Second call with same args should use cached result
      expect(memoizedFn(1, 2)).toBe(3);
      expect(fn).toHaveBeenCalledTimes(1);

      // Call with different args should execute the function again
      expect(memoizedFn(2, 3)).toBe(5);
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it("should handle complex arguments", () => {
      const fn = vi.fn((obj: { a: number; b: number }) => obj.a + obj.b);
      const memoizedFn = memoize(fn);

      expect(memoizedFn({ a: 1, b: 2 })).toBe(3);
      expect(fn).toHaveBeenCalledTimes(1);

      expect(memoizedFn({ a: 1, b: 2 })).toBe(3);
      expect(fn).toHaveBeenCalledTimes(1);

      expect(memoizedFn({ a: 2, b: 3 })).toBe(5);
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe("memoizeWithLRU", () => {
    it("should cache function results with LRU eviction", () => {
      const fn = vi.fn((x: number) => x * 2);
      const memoizedFn = memoizeWithLRU(fn, 2); // Cache size of 2

      // Fill cache
      expect(memoizedFn(1)).toBe(2);
      expect(memoizedFn(2)).toBe(4);
      expect(fn).toHaveBeenCalledTimes(2);

      // Access cached values
      expect(memoizedFn(1)).toBe(2);
      expect(memoizedFn(2)).toBe(4);
      expect(fn).toHaveBeenCalledTimes(2);

      // Add third value, should evict first (LRU)
      expect(memoizedFn(3)).toBe(6);
      expect(fn).toHaveBeenCalledTimes(3);

      // First value should have been evicted
      expect(memoizedFn(1)).toBe(2); // Should recompute
      expect(fn).toHaveBeenCalledTimes(4);
    });

    it("should provide cache statistics", () => {
      const fn = vi.fn((x: number) => x * 2);
      const memoizedFn = memoizeWithLRU(fn, 5);

      expect(memoizedFn.getCacheStats()).toEqual({
        size: 0,
        maxSize: 5,
        hitRate: 0,
      });

      memoizedFn(1);
      memoizedFn(1); // Cache hit

      const stats = memoizedFn.getCacheStats();
      expect(stats.size).toBe(1);
      expect(stats.maxSize).toBe(5);
      expect(stats.hitRate).toBe(0.5); // 1 hit out of 2 calls
    });

    it("should allow cache clearing", () => {
      const fn = vi.fn((x: number) => x * 2);
      const memoizedFn = memoizeWithLRU(fn, 5);

      memoizedFn(1);
      memoizedFn(2);
      expect(memoizedFn.getCacheStats().size).toBe(2);

      memoizedFn.clearCache();
      expect(memoizedFn.getCacheStats().size).toBe(0);
      expect(memoizedFn.getCacheStats().hitRate).toBe(0);
    });
  });

  describe("withPerformanceMonitoring", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      // Mock console.log to avoid test output pollution
      vi.spyOn(console, "log").mockImplementation(() => {});
    });

    it("should not add monitoring in non-development mode", () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      const fn = vi.fn((x: number) => x * 2);
      const monitoredFn = withPerformanceMonitoring(fn, "testFn");

      expect(monitoredFn).toBe(fn); // Should return original function

      process.env.NODE_ENV = originalNodeEnv;
    });

    it("should add monitoring in development mode", () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      const fn = vi.fn((x: number) => x * 2);
      const monitoredFn = withPerformanceMonitoring(fn, "testFn");

      expect(monitoredFn).not.toBe(fn); // Should return wrapper function
      expect(monitoredFn(5)).toBe(10);
      expect(fn).toHaveBeenCalledWith(5);

      process.env.NODE_ENV = originalNodeEnv;
    });
  });

  describe("getRecastClasses performance", () => {
    it("should benefit from memoization", () => {
      const styles: RelaxedStyles = {
        base: "text-base font-medium",
        variants: {
          variant: {
            primary: "bg-blue-500 text-white",
            secondary: "bg-gray-500 text-white",
          },
          size: {
            sm: "px-2 py-1 text-sm",
            lg: "px-6 py-3 text-lg",
          },
        },
        modifiers: {
          disabled: "opacity-50 cursor-not-allowed",
          fullWidth: "w-full",
        },
      };

      const variants: RelaxedVariantProps = { variant: "primary", size: "lg" };
      const modifiers: RelaxedModifierProps = { disabled: true };

      // First call
      const result1 = getRecastClasses({ styles, variants, modifiers });

      // Second call with same params should be cached
      const result2 = getRecastClasses({ styles, variants, modifiers });

      // Results should be identical (same reference due to caching)
      expect(result1).toEqual(result2);
      expect(result1.className).toContain("text-base font-medium");
      expect(result1.className).toContain("bg-blue-500 text-white");
      expect(result1.className).toContain("px-6 py-3 text-lg");
      expect(result1.className).toContain("opacity-50 cursor-not-allowed");
    });
  });

  describe("mergeStringClassNames performance", () => {
    it("should benefit from memoization", () => {
      const class1 = "text-base font-medium";
      const class2 = "bg-blue-500 text-white";

      // First call
      const result1 = mergeStringClassNames(class1, class2);

      // Second call with same params should be cached
      const result2 = mergeStringClassNames(class1, class2);

      expect(result1).toBe(result2);
      expect(result1).toBe("text-base font-medium bg-blue-500 text-white");
    });

    it("should handle array inputs efficiently", () => {
      const classes1 = ["text-base", "font-medium"];
      const classes2 = ["bg-blue-500", "text-white"];

      const result = mergeStringClassNames(classes1, classes2);
      expect(result).toBe("text-base font-medium bg-blue-500 text-white");
    });
  });

  describe("performance stress testing", () => {
    it("should handle many repeated calls efficiently", () => {
      const styles: RelaxedStyles = {
        base: "base-class",
        variants: {
          size: { sm: "text-sm", md: "text-base", lg: "text-lg" },
          color: { red: "text-red-500", blue: "text-blue-500" },
        },
      };

      const testCases = [
        { variants: { size: "sm", color: "red" }, modifiers: {} },
        { variants: { size: "md", color: "blue" }, modifiers: {} },
        { variants: { size: "lg", color: "red" }, modifiers: {} },
      ];

      // Run many calls to test cache efficiency
      const results: string[] = [];
      for (let i = 0; i < 300; i++) {
        const testCase = testCases[i % testCases.length]!;
        const result = getRecastClasses({
          styles,
          variants: testCase.variants,
          modifiers: testCase.modifiers,
        });
        results.push(result.className);
      }

      // Verify results are consistent
      expect(results.length).toBe(300);
      expect(results[0]).toBe(results[3]); // Same test case, should be identical
      expect(results[1]).toBe(results[4]); // Same test case, should be identical
    });
  });
});
