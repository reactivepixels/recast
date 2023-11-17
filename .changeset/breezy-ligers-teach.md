---
"@rpxl/recast": major
"@rpxl/recast-primitives": major
---

Complete Recast API overhaul

- Removed `size` prop from API
- Changed `variant` prop to `variants` which now accepts any number of custom variant keys
- Changed `modifier` prop to `modifiers`

This is a substantial rewrite to the exisitng API and removes the "SVM" methodology completely to improve the flexibility of this library.
