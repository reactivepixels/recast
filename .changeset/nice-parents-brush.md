---
"@rpxl/recast": major
"@rpxl/recast-primitives": patch
"@rpxl/sandbox": patch
"@rpxl/docs": patch
---

Remove responsive API

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
