<img src="https://raw.githubusercontent.com/reactivepixels/recast/main/logo.svg" alt="Recast" width="167">

> Build components once. Use everywhere.

[![codecov](https://codecov.io/gh/reactivepixels/recast/graph/badge.svg?token=F21FH8HJ7D)](https://codecov.io/gh/reactivepixels/recast)
![build](https://github.com/reactivepixels/recast/actions/workflows/.github/workflows/ci.yml/badge.svg)
[![Version](https://badge.fury.io/js/@rpxl%2Frecast.svg)](https://badge.fury.io/js/@rpxl%2Frecast)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@rpxl/recast)](https://bundlephobia.com/package/@rpxl/recast@2.0.0)

# Recast

A powerful and flexible styling library for React components.

## Performance Optimizations

Recast includes several built-in performance optimizations to ensure fast rendering:

### Memoization

- **`getRecastClasses`**: The core class generation function is memoized with LRU caching
- **`mergeStringClassNames`**: Class name merging is memoized for repeated combinations
- **`processModifiers` & `processVariants`**: Props processing functions are memoized per style object

### Caching Strategy

- **LRU Cache**: Prevents memory leaks by limiting cache size (default: 200 entries)
- **Intelligent Eviction**: Least recently used entries are automatically removed
- **Cache Statistics**: Available in development mode for monitoring hit rates

### Development Mode Monitoring

Performance monitoring is automatically enabled in development mode:

```typescript
// Logs performance stats every 100 calls
// [Recast Performance] getRecastClasses: 100 calls, avg 0.23ms
```

### Advanced Configuration

```typescript
import { recast } from "@rpxl/recast";

// Configure performance settings
recast.configure({
  performance: {
    enableMonitoring: true, // Force enable monitoring
    cacheSize: 500, // Increase cache size
  },
});
```

### Custom Performance Tools

For advanced use cases, performance utilities are exported:

```typescript
import { memoize, memoizeWithLRU, withPerformanceMonitoring } from "@rpxl/recast";

// Basic memoization
const memoizedFn = memoize(expensiveFunction);

// LRU memoization with size limit
const lruMemoizedFn = memoizeWithLRU(expensiveFunction, 100);

// Performance monitoring wrapper
const monitoredFn = withPerformanceMonitoring(expensiveFunction, "myFunction");

// Access cache statistics
console.log(lruMemoizedFn.getCacheStats());
// { size: 50, maxSize: 100, hitRate: 0.85 }
```

### Performance Best Practices

1. **Reuse style objects**: Create styles once and reuse them across components
2. **Stable prop values**: Avoid creating new objects in render functions
3. **Use composition**: Compose styles instead of recreating them
4. **Monitor cache hit rates**: Check performance stats in development

## Installation & Usage

### 2.1 Installation

```bash
npm install @rpxl/recast
```

### 2.2 Basic Usage

1. Import Recast:

```ts
import { recast } from "@rpxl/recast";
```

2. Create a basic component:

```ts
const Button = recast(ButtonPrimitive, {
  base: "bg-blue-500 text-white px-4 py-2 rounded",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
});
```

3. Use the component:

```jsx
<Button size="md">Click me</Button>
```

## 3. Core Concepts

### 3.1 Base Styles

Base styles are applied to all instances of the component:

```ts
const Button = recast(ButtonPrimitive, {
  base: "bg-blue-500 text-white px-4 py-2 rounded",
});
```

### 3.2 Variants

Variants allow you to define different style variations:

```ts
const Button = recast(ButtonPrimitive, {
  base: "bg-blue-500 text-white px-4 py-2 rounded",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    color: {
      primary: "bg-blue-500",
      secondary: "bg-gray-500",
    },
  },
});
```

### 3.3 Modifiers

Modifiers are boolean props that can be applied to change styles:

```ts
const Button = recast(ButtonPrimitive, {
  base: "bg-blue-500 text-white px-4 py-2 rounded",
  modifiers: {
    disabled: "opacity-50 cursor-not-allowed",
    active: "ring-2 ring-blue-300",
  },
});
```

### 3.4 Conditional Styling

Apply styles based on specific combinations of variants and modifiers:

```ts
const Button = recast(ButtonPrimitive, {
  base: "bg-blue-500 text-white px-4 py-2 rounded",
  variants: {
    size: {
      sm: "text-sm",
      lg: "text-lg",
    },
  },
  modifiers: {
    disabled: "opacity-50",
  },
  conditionals: [
    {
      variants: { size: "lg" },
      modifiers: ["disabled"],
      className: "border-2 border-red-500",
    },
  ],
});
```

## 4. Advanced Usage

### 4.1 Nested Component Structure

Recast excels at managing complex React component structures. For example, a slider component composed of multiple elements can have styles applied independently to each part.

### 4.2 Default Variants and Modifiers

Set default values for variants and modifiers:

```ts
const Button = recast(ButtonPrimitive, {
  base: "bg-blue-500 text-white px-4 py-2 rounded",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaults: {
    variants: { size: "md" },
  },
});
```

### 4.3 Combining with Other Styling Solutions

Recast can be used alongside other styling solutions like Tailwind CSS or CSS-in-JS libraries. This flexibility allows you to integrate Recast into your existing projects seamlessly.

## 5. API Reference

### 5.1 recast Function

The main function for creating Recast components:

```ts
recast(Component, styles: RecastStyles): RecastComponent
```

### 5.2 RecastStyles

The structure for defining styles in Recast:

```ts
interface RecastStyles {
  base?: string | string[];
  variants?: Record<string, Record<string, string | string[]>>;
  modifiers?: Record<string, string | string[]>;
  conditionals?: Array<{
    variants?: Record<string, string>;
    modifiers?: string[];
    className: string | string[];
  }>;
  defaults?: {
    variants?: Record<string, string>;
    modifiers?: string[];
  };
}
```

## 6. Best Practices

1. Keep your primitive components simple and focused on functionality.
2. Use Recast to handle all styling concerns.
3. Use conditionals for complex style combinations.
4. Set sensible defaults to reduce prop clutter in usage.
5. Use TypeScript for better type checking and developer experience.

## 7. Troubleshooting

Common issues when using Recast:

1. Styles not applying correctly: Ensure that your className strings are valid and that you're using the correct variant and modifier names.
2. TypeScript errors: Make sure you're using the latest version of Recast and that your types are correctly defined.
3. Performance issues: If you're experiencing performance problems, try to minimize the use of complex conditional styles and consider memoizing your components.

## 8. Contributing to Recast

We welcome contributions to Recast! Here's how you can help:

1. Fork the repository and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes.
4. Make sure your code lints.
5. Issue that pull request!

Please refer to the [CONTRIBUTING.md](https://github.com/reactivepixels/recast/blob/main/CONTRIBUTING.md) file for more detailed information.

## 9. Changelog

Recent changes and updates to Recast:

- v2.0.0: Major release with improved TypeScript support and performance optimizations.
- v1.5.0: Added support for nested component structures.
- v1.4.0: Introduced conditional styling feature.
- v1.2.0: Added support for default variants and modifiers.
- v1.0.0: Initial stable release of Recast.

For a complete list of changes, please refer to the [CHANGELOG.md](https://github.com/reactivepixels/recast/blob/main/CHANGELOG.md) file.

## Documentation

For full documentation, visit [here](https://reactivepixels.github.io/recast).

## Acknowledgments

Recast draws inspiration from several excellent projects in the CSS-in-JS and variant-based styling ecosystem:

- [Tailwind Variants](https://www.tailwind-variants.org/): For its approach to combining Tailwind with a first-class variant API.
- [Stitches](https://stitches.dev/): For pioneering many concepts in variant-based styling and near-zero runtime CSS-in-JS.
- [CVA (Class Variance Authority)](https://cva.style/docs): For its work on creating variant APIs for traditional CSS approaches.

We're grateful to these projects for pushing the boundaries of component styling and inspiring aspects of Recast's design.
