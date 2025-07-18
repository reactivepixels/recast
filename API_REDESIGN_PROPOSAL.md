# Recast API Redesign Proposal

## Overview

This document outlines a proposed redesign of the Recast API to make it more flexible, portable, and intuitive while maintaining its core philosophy of abstracting theme layers from component logic.

## Current State Analysis

### Current API

```tsx
const Button = recast(Component, {
  defaults: { variants: { variant: "primary", size: "md" } },
  base: "base-classes",
  variants: {
    /* ... */
  },
  modifiers: {
    /* ... */
  },
});
```

### Current Limitations

1. **Tight coupling**: Styles are bound to specific components
2. **Limited reusability**: Styles can't be easily shared across different components
3. **Framework dependency**: Styles are tied to React components
4. **No global configuration**: Each usage requires manual configuration

## Proposed New API

### 1. Core API Structure

#### A. Portable Styles Creation

```tsx
// Create portable, reusable styles
const buttonStyles = recast.styles({
  defaults: { variants: { variant: "primary", size: "md" } },
  base: "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  variants: {
    variant: {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    },
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    },
  },
  modifiers: {
    fullWidth: "w-full",
    disabled: "opacity-50 cursor-not-allowed",
  },
});
```

#### B. Component Application

```tsx
// Apply styles to a component
const Button = buttonStyles(Component);

// Apply with custom merge function
const Button = buttonStyles(Component, cn);

// Direct usage (for backward compatibility)
const Button = recast(Component, {
  /* styles */
});
```

### 2. Global Configuration

```tsx
// Configure global defaults
recast.configure({
  mergeFn: cn, // Default merge function
});

// Configuration options
interface RecastConfig {
  mergeFn?: (classes: string | string[], className?: string) => string;
}
```

### 3. Style Composition

```tsx
// Compose multiple style sets
const baseButtonStyles = recast.styles({
  base: "inline-flex items-center justify-center rounded-md font-medium transition-colors",
});

const primaryButtonStyles = recast.styles({
  variants: {
    variant: {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
    },
  },
});

const largeButtonStyles = recast.styles({
  variants: {
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
});

// Combine styles
const PrimaryLargeButton = recast.compose([
  baseButtonStyles,
  primaryButtonStyles,
  largeButtonStyles,
])(Component);
```

### 4. Style Utilities

#### A. Style Validation

```tsx
// Runtime validation
const buttonStyles = recast.styles({
  variants: {
    size: {
      sm: "text-sm",
      // Missing 'md' but referenced in defaults
    },
  },
  defaults: {
    variants: { size: "md" }, // This would error in development
  },
});
```

#### B. Style Extraction

```tsx
// Extract class names directly from the style object
const className = buttonStyles.extract({ variant: "primary", size: "lg" });
// Returns: "inline-flex items-center justify-center rounded-md font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 text-lg"

// For nested components, returns an object with cls structure
const nestedClasses = sliderStyles.extract({ size: "lg" });
// Returns: { root: "relative flex w-full...", track: "relative h-1.5...", ... }
```

### 5. Advanced Features

#### A. Conditional Styles (Enhanced)

```tsx
const buttonStyles = recast.styles({
  base: "base-classes",
  variants: {
    variant: { primary: "bg-blue-500", secondary: "bg-gray-500" },
    size: { sm: "text-sm", lg: "text-lg" },
  },
  conditionals: [
    {
      variants: { variant: "primary", size: "lg" },
      className: "shadow-lg",
    },
    {
      modifiers: ["disabled"],
      className: "opacity-50 cursor-not-allowed",
    },
  ],
});
```

#### B. Nested Components (cls prop)

```tsx
// Nested component support remains the same
const Slider = recast.styles({
  base: {
    root: "relative flex w-full touch-none select-none items-center",
    track: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-black",
    range: "absolute h-full bg-white",
    thumb: "block h-4 w-4 rounded-full border-2 border-white bg-black",
  },
  variants: {
    size: {
      sm: {
        root: "h-4",
        track: "h-1",
        thumb: "h-3 w-3",
      },
      lg: {
        root: "h-6",
        track: "h-2",
        thumb: "h-5 w-5",
      },
    },
  },
})(SliderComponent);
```

## Usage Examples

### Basic Usage

```tsx
// 1. Create styles
const buttonStyles = recast.styles({
  defaults: { variants: { variant: "primary", size: "md" } },
  base: "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  variants: {
    variant: {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    },
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    },
  },
  modifiers: {
    fullWidth: "w-full",
  },
});

// 2. Apply to component
const Button = buttonStyles(ButtonPrimitive);

// 3. Use
<Button variant="primary" size="lg" fullWidth>
  Click me
</Button>;
```

### Advanced Usage

```tsx
// Global configuration
recast.configure({
  mergeFn: cn,
});

// Create reusable style sets
const baseStyles = recast.styles({ base: "base-classes" });
const primaryStyles = recast.styles({
  variants: { variant: { primary: "bg-blue-500" } },
});
const largeStyles = recast.styles({ variants: { size: { lg: "text-lg" } } });

// Compose styles
const PrimaryLargeButton = recast.compose([
  baseStyles,
  primaryStyles,
  largeStyles,
])(ButtonPrimitive);

// Extract class names for other uses
const className = buttonStyles.extract({ variant: "primary", size: "lg" });
```

### Style Extraction Examples

#### Example 1: Server-Side Rendering

```tsx
const buttonStyles = recast.styles({
  base: "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  variants: {
    variant: {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    },
    size: {
      sm: "px-3 py-2 text-sm",
      lg: "px-6 py-3 text-lg",
    },
  },
});

// Use in SSR or static generation
export async function generateStaticProps() {
  const primaryButtonClass = buttonStyles.extract({
    variant: "primary",
    size: "lg",
  });
  // Returns: "inline-flex items-center justify-center rounded-md font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 text-lg"

  return {
    props: {
      buttonClass: primaryButtonClass,
    },
  };
}
```

#### Example 2: Testing Style Logic

```tsx
const buttonStyles = recast.styles({
  base: "base-classes",
  variants: {
    variant: { primary: "bg-blue-500", secondary: "bg-gray-500" },
    size: { sm: "text-sm", lg: "text-lg" },
  },
});

// Test style logic without React
describe("Button Styles", () => {
  it("should apply primary variant correctly", () => {
    const className = buttonStyles.extract({ variant: "primary" });
    expect(className).toContain("bg-blue-500");
    expect(className).not.toContain("bg-gray-500");
  });

  it("should apply size variants correctly", () => {
    const smallClass = buttonStyles.extract({ size: "sm" });
    const largeClass = buttonStyles.extract({ size: "lg" });

    expect(smallClass).toContain("text-sm");
    expect(largeClass).toContain("text-lg");
  });
});
```

#### Example 3: Nested Component Extraction

```tsx
const sliderStyles = recast.styles({
  base: {
    root: "relative flex w-full touch-none select-none items-center",
    track: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-black",
    range: "absolute h-full bg-white",
    thumb: "block h-4 w-4 rounded-full border-2 border-white bg-black",
  },
  variants: {
    size: {
      sm: {
        root: "h-4",
        track: "h-1",
        thumb: "h-3 w-3",
      },
      lg: {
        root: "h-6",
        track: "h-2",
        thumb: "h-5 w-5",
      },
    },
  },
});

// Extract nested component classes
const sliderClasses = sliderStyles.extract({ size: "lg" });
// Returns: {
//   root: "relative flex w-full touch-none select-none items-center h-6",
//   track: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-black h-2",
//   range: "absolute h-full bg-white",
//   thumb: "block h-4 w-4 rounded-full border-2 border-white bg-black h-5 w-5"
// }

## Benefits of New API

### 1. **Portability**

- Styles can be shared across different components
- Framework-agnostic style definitions
- Easy to create style libraries

### 2. **Flexibility**

- Multiple ways to apply styles
- Global configuration options
- Style composition and merging

### 3. **Developer Experience**

- Intuitive API that follows common patterns
- Better TypeScript support
- Runtime validation and error messages

### 4. **Performance**

- Better tree-shaking opportunities
- Memoization-friendly design
- Reduced bundle size through style reuse

### 5. **Maintainability**

- Clear separation of concerns
- Easier testing of style logic
- Better code organization

## Migration Strategy

Since backward compatibility is not required:

1. **Major version bump** (v6.0.0)
2. **Update documentation** with new API examples
3. **Provide migration guide** for existing users
4. **Deprecate old API** with clear migration path

## Implementation Plan

### Phase 1: Core API ✅ **COMPLETED**

1. ✅ Implement `recast.styles()` function
2. ✅ Implement curried component application
3. ✅ Add global configuration system

### Phase 2: Utilities ✅ **COMPLETED**

1. ✅ Add style composition utilities
2. ✅ Add style extraction functionality
3. ✅ Implement runtime validation (development only)

### Phase 3: Advanced Features ✅ **COMPLETED**

1. ✅ Enhanced conditional styles
2. ✅ Improved TypeScript support
3. ✅ Performance optimizations
   - ✅ Memoization with LRU caching
   - ✅ Performance monitoring for development
   - ✅ Optimized class generation pipeline

### Phase 4: Documentation & Examples ✅ **COMPLETED**

1. ✅ Update all documentation
2. ✅ Create migration guide
3. ✅ Add comprehensive examples

## Implementation Status

**🎉 All phases completed successfully!**

### Current Version: v5.0.2

The new Recast API has been fully implemented and is production-ready. Key achievements:

- **Full API Implementation**: All proposed features have been implemented
- **Performance Optimizations**: Built-in memoization, LRU caching, and performance monitoring
- **TypeScript Excellence**: Complete type safety with helper types like `RecastClsProps`
- **Comprehensive Testing**: 152 tests passing with high coverage
- **Documentation**: Complete documentation with real-world examples
- **Migration Support**: Clear migration path from v4 to v5+

### Recent Additions (Phase 3 Enhancements)

- **Advanced Performance Features**:
  - `memoizeWithLRU()` with configurable cache sizes
  - `withPerformanceMonitoring()` for development insights
  - Optimized `getRecastClasses()` with performance tracking
  - Exported performance utilities for advanced use cases

- **Enhanced TypeScript Support**:
  - `RecastClsProps<T>` helper for nested component types
  - Improved type inference throughout the API
  - Better IntelliSense and auto-completion

- **Production Optimizations**:
  - Smart caching with LRU eviction (default: 200 entries)
  - Memoized style computation pipeline
  - Development-only validation and monitoring

## Questions for Discussion

1. **API naming**: Should we use `recast.styles()` or `recast.createStyles()`? ✅ **Decided: `recast.styles()`** ✅ **IMPLEMENTED**
2. **Composition API**: Is `recast.compose()` the right name, or should it be `recast.merge()`? ✅ **Decided: `recast.compose()`** ✅ **IMPLEMENTED**
3. **Global config**: Should configuration be global or per-instance? ✅ **Decided: Global for now, focused on mergeFn** ✅ **IMPLEMENTED**
4. **Validation**: What level of runtime validation should be enabled by default? ✅ **Decided: Development only** ✅ **IMPLEMENTED**
5. **Performance**: Should we add built-in memoization for style computations? ✅ **Decided: Yes, with LRU caching** ✅ **IMPLEMENTED**

## Next Steps ✅ **ALL COMPLETED**

1. ✅ **Review and iterate** on this design document
2. ✅ **Finalize API decisions** based on feedback
3. ✅ **Create implementation plan** with specific milestones
4. ✅ **Begin implementation** starting with core API
5. ✅ **Update documentation** and examples

## Future Considerations

With the core API complete, potential future enhancements could include:

- **Framework Support**: Extend beyond React to support Vue, Svelte, etc.
- **Build-time Optimizations**: Static analysis and pre-compilation of styles
- **Advanced Composition**: Plugin system for extending functionality
- **Developer Tools**: Browser extension for debugging and visualization

---

_This document reflects the completed implementation of the Recast API redesign. The new API is production-ready and available in v5.0.2+._
```
