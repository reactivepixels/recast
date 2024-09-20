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
  plugins: [require("@rpxl/recast-tailwind")],
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
    ["recast\\(([^)]_)\\)", "[\"'`]([^\"'`]_).*?[\"'`]"]
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

### Modifiers

Recast also supports modifiers with Tailwind CSS. Here's how you can use them:

```jsx
const Button = recast(ButtonPrimitive, {
  modifiers: { pill: "rounded-full" },
});

<Button pill>Pill Button</Button>;
```

The plugin generates HTML with classes like this:

```html
<button class="rounded-full">Pill Button</button>
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

These breakpoints are then used in your Recast components for responsive styling.

## Plugin Implementation

The Recast Tailwind plugin handles the generation of safelist classes based on your component definitions and usages.

```ts
usages.forEach((usage) => {
  const component = components[usage.componentName];
  if (!component) {
    return;
  }

  // Add base classes to safelist
  if (component.base) {
    addToSafelist(safelist, component.base);
  }

  Object.entries(usage.props).forEach(([propName, propValue]) => {
    const variantGroup = component.variants?.[propName];
    if (!variantGroup) {
      return;
    }

    if (typeof propValue === "object" && propValue !== null) {
      Object.entries(propValue).forEach(([breakpoint, value]) => {
        if (typeof value === "string") {
          const classes = variantGroup[value];
          if (classes) {
            addToSafelist(
              safelist,
              classes,
              breakpoint !== "default" ? breakpoint : ""
            );
          }
        }
      });
    } else if (typeof propValue === "string") {
      const classes = variantGroup[propValue];
      if (classes) {
        addToSafelist(safelist, classes);
      }
    }
  });
});
```

This implementation ensures that all necessary classes for your Recast components are included in your final CSS, even when using dynamic class generation.

By following this setup and usage guide, you can leverage the full power of Recast with Tailwind CSS, creating flexible and responsive components with ease.
