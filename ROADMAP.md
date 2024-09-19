# Recast Tailwind Integration Roadmap

## Overall Goal

To create a robust, performant, and developer-friendly system for building reusable React components with responsive styling capabilities, fully integrated with Tailwind CSS and optimized for Next.js environments using SWC.

## Current State

Currently, Recast uses a Tailwind plugin to generate a safelist of classes based on component definitions and usages. This approach, while functional, has limitations in terms of performance and accuracy, especially in a Next.js environment.

## Roadmap to SWC Integration

### Phase 1: Enhanced Tailwind Plugin (Current Focus)

#### Goals:

- Improve the current Tailwind plugin implementation
- Introduce an optional `breakpoints` key for more granular control over responsive class generation
- Ensure compatibility with Next.js environments

#### Implementation:

1. Update the `RecastStyles` interface in the Recast library:

```typescript
export interface RecastStyles {
  // ... existing properties
  breakpoints?: "all" | string[];
}
```

2. Modify the Recast Tailwind plugin to handle the new `breakpoints` key:

```typescript
function generateResponsiveClasses(component: RecastComponent, config: any) {
  const breakpoints =
    component.breakpoints === "all"
      ? Object.keys(config("theme.screens"))
      : component.breakpoints || [];

  // Generate classes based on specified breakpoints
  // ...
}
```

3. Update documentation to reflect new features and usage
4. Ensure the plugin works efficiently within Next.js build process

### Phase 2: SWC Plugin Development (Final Goal)

#### Goals:

- Fully integrate with Next.js and its SWC-based compiler
- Maximize performance and accuracy of component analysis
- Provide a seamless developer experience in Next.js environments

#### Implementation:

1. Develop a Rust-based parser for identifying Recast components and their usages
2. Create an SWC plugin that utilizes this parser during the compilation process
3. Generate optimized metadata and safelist information
4. Integrate with Next.js build process
5. Implement caching mechanisms for improved build performance

### Phase 3: Next.js Integration and Optimization

#### Goals:

- Provide a zero-config setup for Next.js users
- Optimize for large-scale applications
- Ensure backward compatibility with the Tailwind plugin approach

#### Implementation:

1. Develop Next.js-specific configurations and optimizations
2. Create a custom Next.js plugin for seamless integration with SWC and Recast
3. Implement fallback mechanisms for projects not using SWC
4. Provide detailed documentation and migration guides
5. Develop tools for analyzing and optimizing Recast usage in Next.js projects

## Conclusion

The final result will leverage the full power of SWC for static analysis and optimization, while still providing a smooth experience for developers and maintaining compatibility with existing Recast implementations.
