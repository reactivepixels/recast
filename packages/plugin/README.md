## Tailwind CSS Integration

Recast now offers a Tailwind CSS plugin for seamless integration:

```bash
npm install @rpxl/recast-tailwind
```

Add the plugin to your `tailwind.config.js`:

```javascript
module.exports = {
  // ...other config
  plugins: [require("@rpxl/recast-tailwind").recastTailwindPlugin],
};
```

This plugin automatically generates a safelist for your Recast components and provides better integration with Tailwind CSS.
