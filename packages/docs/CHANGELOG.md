# docs

## 1.1.5

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

## 1.1.4

### Patch Changes

- 6e156e4: Improve recast tailwind docs
- Updated dependencies [6e156e4]
  - @rpxl/recast@4.3.0
  - @rpxl/recast-primitives@3.1.4

## 1.1.3

### Patch Changes

- Updated dependencies [c8fc500]
  - @rpxl/recast@4.2.0
  - @rpxl/recast-primitives@3.1.3

## 1.1.2

### Patch Changes

- Updated dependencies [141f02a]
  - @rpxl/recast@4.1.2
  - @rpxl/recast-primitives@3.1.2

## 1.1.1

### Patch Changes

- Updated dependencies [1b0a637]
  - @rpxl/recast@4.1.1
  - @rpxl/recast-primitives@3.1.1

## 1.1.0

### Minor Changes

- b15ea25: Add responsive tailwind functionality to recast.

### Patch Changes

- Updated dependencies [b15ea25]
  - @rpxl/recast-primitives@3.1.0
  - @rpxl/recast@4.1.0

## 1.0.3

### Patch Changes

- 2c103f7: Update all package dependencies
- Updated dependencies [2c103f7]
  - @rpxl/recast-primitives@3.0.3
  - @rpxl/recast@4.0.3

## 1.0.2

### Patch Changes

- 63cc987: Remove unused rcx props from Recast components
- Updated dependencies [63cc987]
  - @rpxl/recast@4.0.2
  - @rpxl/recast-primitives@3.0.2

## 1.0.1

### Patch Changes

- Updated dependencies [df65d7c]
  - @rpxl/recast-primitives@3.0.1
  - @rpxl/recast@4.0.1

## 1.0.0

### Major Changes

- c329ff5: Complete Recast API rewrite

### Patch Changes

- Updated dependencies [c329ff5]
  - @rpxl/recast-primitives@3.0.0
  - @rpxl/recast@4.0.0

## 0.4.5

### Patch Changes

- be65cff: Fix npm pack configuration
- Updated dependencies [be65cff]
  - @rpxl/recast@3.1.5
  - @rpxl/recast-primitives@2.2.5

## 0.4.4

### Patch Changes

- 405c426: Fix package.json versions
- Updated dependencies [405c426]
  - @rpxl/recast-primitives@2.2.4
  - @rpxl/recast@3.1.4

## 0.4.3

### Patch Changes

- 0a7a99c: Fix pnpm lockfile issue
- Updated dependencies [0a7a99c]
  - @rpxl/recast@3.1.3
  - @rpxl/recast-primitives@2.2.3

## 0.4.2

### Patch Changes

- 7cea577: Regenerate pnpm lockfile
- Updated dependencies [7cea577]
  - @rpxl/recast-primitives@2.2.2
  - @rpxl/recast@3.1.2

## 0.4.1

### Patch Changes

- a4b311e: Fix CI script
- Updated dependencies [a4b311e]
  - @rpxl/recast@3.1.1
  - @rpxl/recast-primitives@2.2.1

## 0.4.0

### Minor Changes

- 8d0e436: Change package manager to pnpm

### Patch Changes

- Updated dependencies [8d0e436]
  - @rpxl/recast-primitives@2.2.0
  - @rpxl/recast@3.1.0

## 0.3.0

### Minor Changes

- 2ff0e26: Update getRecastClasses API documentation

## 0.2.0

### Minor Changes

- b72972d: Refactor useRecastClasses hook into context free utility

### Patch Changes

- Updated dependencies [b72972d]
  - @rpxl/recast@3.0.0
  - @rpxl/recast-primitives@2.1.0

## 0.1.3

### Patch Changes

- be33bfb: Update dependencies
- Updated dependencies [be33bfb]
  - @rpxl/recast-primitives@2.0.12
  - @rpxl/recast@2.0.3

## 0.1.2

### Patch Changes

- fc6423b: Update deps
- Updated dependencies [fc6423b]
  - @rpxl/recast-primitives@2.0.2
  - @rpxl/recast@2.0.2

## 0.1.1

### Patch Changes

- 70513e3: Refactored use recastClasses hook
- Updated dependencies [70513e3]
  - @rpxl/recast-primitives@2.0.1
  - @rpxl/recast@2.0.1
