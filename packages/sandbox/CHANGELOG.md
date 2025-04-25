# @rpxl/sandbox

## 0.2.9

### Patch Changes

- 3ee3902: Update dependencies
- Updated dependencies [3ee3902]
  - @rpxl/recast-primitives@3.1.7
  - @rpxl/recast@5.0.2

## 0.2.8

### Patch Changes

- 8260de3: Fix broken build script
- Updated dependencies [8260de3]
  - @rpxl/recast@5.0.1
  - @rpxl/recast-primitives@3.1.6

## 0.2.7

### Patch Changes

- a61fbbe: Remove responsive API

  ## Breaking Changes

  ### Removed Features

  - Removed the responsive API and all related functionality
  - Removed breakpoint detection and configuration
  - Removed responsive value types and utilities
  - Removed responsive style generation

  ### Migration Guide

  1. Replace any responsive values with direct Tailwind CSS classes
  2. Update component props to remove responsive-related types
  3. Remove any responsive configuration from your theme setup
  4. Update documentation to remove responsive API references

  ### Impact

  - This change simplifies the API by removing the responsive abstraction layer
  - Components will now use Tailwind's built-in responsive utilities directly
  - Type definitions have been simplified by removing responsive value types
  - Documentation has been updated to reflect the removal of responsive features

  ### Benefits

  - Reduced bundle size by removing responsive utilities
  - Simplified API surface
  - Better alignment with Tailwind CSS's native responsive features
  - Improved type safety by removing complex responsive value types

- Updated dependencies [a61fbbe]
  - @rpxl/recast@5.0.0
  - @rpxl/recast-primitives@3.1.5

## 0.2.6

### Patch Changes

- Updated dependencies [6e156e4]
  - @rpxl/recast@4.3.0
  - @rpxl/recast-primitives@3.1.4

## 0.2.5

### Patch Changes

- Updated dependencies [c8fc500]
  - @rpxl/recast@4.2.0
  - @rpxl/recast-primitives@3.1.3

## 0.2.4

### Patch Changes

- 292a33b: Add nested variant resolution

## 0.2.3

### Patch Changes

- Updated dependencies [141f02a]
  - @rpxl/recast@4.1.2
  - @rpxl/recast-primitives@3.1.2

## 0.2.2

### Patch Changes

- 579ba4c: Fix recast tailwind breakpoint implementation

## 0.2.1

### Patch Changes

- Updated dependencies [1b0a637]
  - @rpxl/recast@4.1.1
  - @rpxl/recast-primitives@3.1.1

## 0.2.0

### Minor Changes

- b15ea25: Add responsive tailwind functionality to recast.

### Patch Changes

- Updated dependencies [b15ea25]
  - @rpxl/recast-primitives@3.1.0
  - @rpxl/recast@4.1.0
