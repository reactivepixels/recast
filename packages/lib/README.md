<img src="https://raw.githubusercontent.com/reactivepixels/recast/main/logo.svg" alt="Recast" width="167">

> Build components once. Use everywhere.

[![codecov](https://codecov.io/gh/reactivepixels/recast/graph/badge.svg?token=F21FH8HJ7D)](https://codecov.io/gh/reactivepixels/recast)
![build](https://github.com/reactivepixels/recast/actions/workflows/.github/workflows/ci.yml/badge.svg)
[![Version](https://badge.fury.io/js/@rpxl%2Frecast.svg)](https://badge.fury.io/js/@rpxl%2Frecast)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@rpxl/recast)](https://bundlephobia.com/package/@rpxl/recast@2.0.0)

# Recast

A powerful and flexible styling library for React components that provides type-safe, reusable styles with built-in performance optimizations.

## Performance Optimizations

Recast includes several built-in performance optimizations to ensure fast rendering:

- **Memoization**: All style computations are cached using intelligent memoization strategies.
- **LRU Caching**: Prevents memory leaks by limiting cache size (default: 200 entries).
- **Performance Monitoring**: Logs performance stats in development mode when enabled.

Configure performance options globally:

```ts
import { recast } from "@rpxl/recast";

recast.configure({
  performance: {
    enableMonitoring: true,
    cacheSize: 100, // Customize cache size
  },
});
```

## Installation

```bash
npm install @rpxl/recast
```

## Quick Start

```ts
import { recast } from "@rpxl/recast";

// 1. Create reusable styles
const buttonStyles = recast.styles({
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
    disabled: "opacity-50 cursor-not-allowed",
    fullWidth: "w-full",
  },
  defaults: {
    variants: { variant: "primary", size: "md" },
  },
});

// 2. Apply to a component
const Button = buttonStyles(ButtonPrimitive);

// 3. Use with full type safety
<Button variant="secondary" size="lg" disabled>
  Click me
</Button>
```

## Core Features

### 1. Reusable Styles

Create portable style objects that can be applied to any component:

```ts
const buttonStyles = recast.styles({
  base: "bg-blue-500 text-white px-4 py-2 rounded",
  variants: {
    size: {
      sm: "text-sm px-2 py-1",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3",
    },
  },
});

// Apply to different components
const Button = buttonStyles(ButtonPrimitive);
const Link = buttonStyles(LinkPrimitive);
```

### 2. Variants and Modifiers

**Variants** are mutually exclusive options:

```ts
const styles = recast.styles({
  variants: {
    color: {
      primary: "bg-blue-500",
      secondary: "bg-gray-500",
    },
    size: {
      sm: "text-sm",
      lg: "text-lg",
    },
  },
});
```

**Modifiers** are boolean flags that can be combined:

```ts
const styles = recast.styles({
  modifiers: {
    disabled: "opacity-50 cursor-not-allowed",
    loading: "animate-pulse",
    fullWidth: "w-full",
  },
});

// Usage: <Button disabled loading fullWidth />
```

### 3. Conditional Styling

Apply styles only when specific conditions are met:

```ts
const buttonStyles = recast.styles({
  base: "px-4 py-2 rounded",
  variants: {
    variant: { primary: "bg-blue-500", secondary: "bg-gray-500" },
    size: { sm: "text-sm", lg: "text-lg" },
  },
  modifiers: {
    disabled: "cursor-not-allowed",
  },
  conditionals: [
    {
      variants: { variant: "primary", size: "lg" },
      className: "shadow-lg font-bold",
    },
    {
      modifiers: ["disabled"],
      className: "opacity-50",
    },
    {
      variants: { variant: "primary" },
      modifiers: ["disabled"],
      className: "bg-blue-300", // Override primary when disabled
    },
  ],
});
```

### 4. Default Values

Set default variants and modifiers to reduce prop clutter:

```ts
const buttonStyles = recast.styles({
  variants: {
    variant: { primary: "bg-blue-500", secondary: "bg-gray-500" },
    size: { sm: "text-sm", md: "text-base", lg: "text-lg" },
  },
  modifiers: {
    rounded: "rounded-md",
  },
  defaults: {
    variants: { variant: "primary", size: "md" },
    modifiers: ["rounded"], // Always applied unless explicitly set to false
  },
});

// These are equivalent:
<Button />
<Button variant="primary" size="md" rounded />
```

### 5. Style Composition

Combine multiple style objects for modular design:

```ts
const baseStyles = recast.styles({
  base: "inline-flex items-center justify-center",
});

const colorStyles = recast.styles({
  variants: {
    color: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-500 text-white",
    },
  },
});

const sizeStyles = recast.styles({
  variants: {
    size: {
      sm: "px-2 py-1 text-sm",
      lg: "px-6 py-3 text-lg",
    },
  },
});

// Compose into a single style object
const ComposedButton = recast.compose([baseStyles, colorStyles, sizeStyles])(ButtonPrimitive);
```

### 6. Nested Styles and Subcomponents

Style complex components with multiple parts using object syntax:

```ts
const sliderStyles = recast.styles({
  base: {
    root: "relative flex w-full touch-none select-none items-center",
    track: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary",
    range: "absolute h-full bg-primary",
    thumb: "block h-4 w-4 rounded-full border-2 border-primary bg-background",
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

const Slider = sliderStyles(SliderPrimitive);

// Your primitive component receives a `cls` prop with computed class names
function SliderPrimitive({ cls, ...props }: SliderProps) {
  return (
    <div className={cls?.root} {...props}>
      <div className={cls?.track}>
        <div className={cls?.range} />
      </div>
      <div className={cls?.thumb} />
    </div>
  );
}
```

**TypeScript Integration:**

```ts
import { RecastClsProps } from "@rpxl/recast";

interface SliderProps extends RecastClsProps<"root" | "track" | "range" | "thumb"> {
  value?: number;
  onChange?: (value: number) => void;
}
```

### 7. Class Name Extraction

Extract computed class names without rendering components:

```ts
const buttonStyles = recast.styles({
  base: "px-4 py-2 rounded",
  variants: {
    variant: { primary: "bg-blue-500", secondary: "bg-gray-500" },
    size: { sm: "text-sm", lg: "text-lg" },
  },
});

// For simple components (returns string)
const className = buttonStyles.extract({ variant: "primary", size: "lg" });
// Result: "px-4 py-2 rounded bg-blue-500 text-lg"

// For nested components (returns object)
const sliderClasses = sliderStyles.extract({ size: "lg" });
// Result: {
//   root: "relative flex w-full touch-none select-none items-center h-6",
//   track: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary h-2",
//   range: "absolute h-full bg-primary",
//   thumb: "block h-4 w-4 rounded-full border-2 border-primary bg-background h-5 w-5"
// }
```

**Use Cases:**

- Server-side rendering
- Static site generation
- Testing style logic
- External styling systems

### 8. Global Configuration

Configure Recast behavior globally:

```ts
import { recast } from "@rpxl/recast";
import { cn } from "./utils/cn"; // Your preferred class merging function

recast.configure({
  mergeFn: cn, // Custom class merging function (e.g., clsx, classnames)
  performance: {
    enableMonitoring: true, // Log performance stats in development
    cacheSize: 500, // Customize LRU cache size (default: 200)
  },
});
```

## API Reference

### `recast.styles(config)`

Create a reusable style object.

**Parameters:**

- `config`: Style configuration object

**Returns:** Style object with `extract` method and component application function

### `recast.compose(styleObjects)`

Combine multiple style objects into one.

**Parameters:**

- `styleObjects`: Array of style objects to compose

**Returns:** New composed style object

### `recast.configure(config)`

Set global configuration.

**Parameters:**

- `config.mergeFn`: Custom class merging function
- `config.performance.enableMonitoring`: Enable performance logging
- `config.performance.cacheSize`: Set cache size limit

### `styleObject.extract(props)`

Extract class names for given props.

**Parameters:**

- `props`: Variant and modifier props

**Returns:** String (simple components) or object (nested components)

## Advanced Performance

For advanced use cases, you can access performance utilities directly:

```ts
import { memoize, memoizeWithLRU, withPerformanceMonitoring } from "@rpxl/recast";

// Custom memoization
const memoizedFn = memoize(expensiveFunction);

// LRU cache with custom size
const cachedFn = memoizeWithLRU(expensiveFunction, 50);

// Performance monitoring
const monitoredFn = withPerformanceMonitoring(myFunction, "functionName");
```

## Best Practices

1. **Create reusable style libraries:** Share styles across components and projects
2. **Use composition:** Break complex styles into smaller, composable pieces
3. **Set sensible defaults:** Reduce prop repetition in your components
4. **Leverage TypeScript:** Get full type safety for variants and modifiers
5. **Extract for SSR:** Use `.extract()` for server-side rendering optimization
6. **Configure globally:** Set up merge functions and performance options once

## Migration from v5

The new API is not backward compatible. Key changes:

- `recast(Component, styles)` → `recast.styles(styles)(Component)`
- Added `recast.compose()` for style composition
- Added `recast.configure()` for global settings
- Added `.extract()` method for class name extraction
- Improved TypeScript support with `RecastClsProps`

## Examples

### Button Component

```ts
const buttonStyles = recast.styles({
  base: "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    },
  },
  defaults: {
    variants: { variant: "default", size: "default" },
  },
});

export const Button = buttonStyles(ButtonPrimitive);
```

### Card Component with Nested Styles

```ts
const cardStyles = recast.styles({
  base: {
    root: "rounded-xl border bg-card text-card-foreground shadow",
    header: "flex flex-col space-y-1.5 p-6",
    title: "font-semibold leading-none tracking-tight",
    description: "text-sm text-muted-foreground",
    content: "p-6 pt-0",
    footer: "flex items-center p-6 pt-0",
  },
  variants: {
    size: {
      sm: {
        root: "max-w-sm",
        header: "p-4",
        content: "p-4 pt-0",
        footer: "p-4 pt-0",
      },
      lg: {
        root: "max-w-2xl",
        header: "p-8",
        content: "p-8 pt-0",
        footer: "p-8 pt-0",
      },
    },
  },
});

export const Card = cardStyles(CardPrimitive);
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/reactivepixels/recast/blob/main/CONTRIBUTING.md) for details.

## Documentation

Full documentation: [https://reactivepixels.github.io/recast](https://reactivepixels.github.io/recast)

## License

MIT License - see [LICENSE](https://github.com/reactivepixels/recast/blob/main/LICENSE) for details.
