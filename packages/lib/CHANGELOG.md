# @rpxl/recast

## 5.0.2

### Patch Changes

- 3ee3902: Update dependencies

## 5.0.1

### Patch Changes

- 8260de3: Fix broken build script

## 5.0.0

### Major Changes

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

## 4.3.0

### Minor Changes

- 6e156e4: Change nested classes prop from rcx to cls

## 4.2.0

### Minor Changes

- c8fc500: Remove responsive values from recast components that have no breakpoints defined

## 4.1.2

### Patch Changes

- 141f02a: Update recast api to include breakpoints

## 4.1.1

### Patch Changes

- 1b0a637: Fix tsconfig file exclusions

## 4.1.0

### Minor Changes

- b15ea25: Add responsive tailwind functionality to recast.

## 4.0.3

### Patch Changes

- 2c103f7: Update all package dependencies

## 4.0.2

### Patch Changes

- 63cc987: Remove unused cls props from Recast components

## 4.0.1

### Patch Changes

- df65d7c: Fix recast gerneric component prop types

## 4.0.0

### Major Changes

- c329ff5: Complete Recast API rewrite

## 3.1.5

### Patch Changes

- be65cff: Fix npm pack configuration

## 3.1.4

### Patch Changes

- 405c426: Fix package.json versions

## 3.1.3

### Patch Changes

- 0a7a99c: Fix pnpm lockfile issue

## 3.1.2

### Patch Changes

- 7cea577: Regenerate pnpm lockfile

## 3.1.1

### Patch Changes

- a4b311e: Fix CI script

## 3.1.0

### Minor Changes

- 8d0e436: Change package manager to pnpm

## 3.0.0

### Major Changes

- b72972d: Refactor useRecastClasses hook into context free utility

## 2.0.3

### Patch Changes

- be33bfb: Update dependencies

## 2.0.2

### Patch Changes

- fc6423b: Update deps

## 2.0.1

### Patch Changes

- 70513e3: Refactored use recastClasses hook

## 2.0.0

### Major Changes

- 9dc2838: Complete Recast API overhaul

  - Removed `size` prop from API
  - Changed `variant` prop to `variants` which now accepts any number of custom variant keys
  - Changed `modifier` prop to `modifiers`

  This is a substantial rewrite to the exisitng API and removes the "SVM" methodology completely to improve the flexibility of this library.

## 1.0.7

### Patch Changes

- acdd183: Fix conditional Size and Variant client props

## 1.0.6

### Patch Changes

- 08c3748: Map type imports for ESM

## 1.0.5

### Patch Changes

- ca77fa8: Fix ES imports

## 1.0.4

### Patch Changes

- b4c2f5c: Export all types from core

## 1.0.3

### Patch Changes

- a6731ba: Remove relative import filename extensions

## 1.0.2

### Patch Changes

- ce7cc82: Add .js suffix to all imports/exports

## 1.0.1

### Patch Changes

- 6a90f38: Add typings to package exports

## 1.0.0

### Major Changes

- 64d330a: Add server component capabilities

## 0.1.6

### Patch Changes

- 0722726: Add "use client" to context provider

## 0.1.5

### Patch Changes

- d82adc0: Test changesets integration
