# Recast Tailwind CSS Integration

Recast offers tight integration with Tailwind CSS through our dedicated plugin, enhancing your development experience and unlocking powerful styling capabilities.

## Installation

First, install the Recast Tailwind Plugin:

```bash
npm install @rpxl/recast-tailwind-plugin
```

## Setup

Add the plugin to your `tailwind.config.js` file:

```js
module.exports = {
  // ...other config
  plugins: [require("@rpxl/recast-tailwind-plugin")],
};
```

This plugin automatically generates a safelist for your Recast components and provides better integration with Tailwind CSS.

## Features

1. **Automatic Safelist Generation**: Ensures all your Recast component classes are included in your production build.
2. **Responsive Styling**: Easily apply responsive styles to your Recast components using Tailwind's breakpoint syntax.
3. **Improved Performance**: Optimizes class generation for better runtime performance.

## VS Code Setup

To get Tailwind CSS IntelliSense working with Recast in VS Code:

1. Install the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) VS Code extension.

2. Add the following to your `.vscode/settings.json`:

```json
{
  "tailwindCSS.experimental.classRegex": [
    [
      "recast\\(([^)]*)\\)",
      "(?<!(?:breakpoints|defaults):\\s*(?:\\[|\\{)[^\\]}]*)[\"'`]([^\"'`]*).*?[\"'`]"
    ]
  ]
}
```

## Responsive Styling Example

With the Recast Tailwind plugin, you can easily apply responsive styles:

### Responsive Variants

```jsx
const Button = recast(ButtonPrimitive, {
  variants: {
    size: {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    },
  },
  breakpoints: ["sm", "md", "lg"],
});

<Button size={{ default: "sm", md: "md", lg: "lg" }}>Responsive Button</Button>;
```

This button will be small by default, medium on md screens, and large on lg screens. The plugin will generate classes like:

```html
<button
  class="px-2 py-1 text-sm md:px-4 md:py-2 md:text-base lg:px-6 lg:py-3 lg:text-lg"
>
  Responsive Button
</button>
```

## Prettier Integration

Recast works seamlessly with the [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss). Add the following to your `.prettierrc`:

```json
{ "tailwindFunctions": ["recast"] }
```

This ensures that your Tailwind classes within Recast components are properly sorted.

## Breakpoints Configuration

Recast uses the breakpoints defined in your Tailwind configuration. Here's an example of how to set up breakpoints:

```ts
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
```

These breakpoints can then used in your Recast components for responsive styling.
