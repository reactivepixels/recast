// src/index.ts
import plugin from "tailwindcss/plugin";
import fs from "fs";
import { glob } from "glob";
import util from "util";
function debugLog(label, data) {
  console.log(
    `DEBUG - ${label}:`,
    util.inspect(data, { depth: null, colors: true })
  );
}
function parseRecastComponents(content) {
  const componentRegex = /export\s+const\s+(\w+)\s*=\s*recast\s*\(\s*\w+\s*,\s*({[\s\S]*?})\s*\)/g;
  const components = {};
  let match;
  while ((match = componentRegex.exec(content)) !== null) {
    const [, componentName, componentDef] = match;
    try {
      const processedDef = componentDef.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ').replace(/'/g, '"').replace(/,\s*}/g, "}").replace(/\n/g, " ").replace(/\s+/g, " ");
      const componentObj = JSON.parse(processedDef);
      components[componentName] = componentObj;
    } catch (e) {
      console.error(`Error parsing component ${componentName}:`, e);
    }
  }
  return components;
}
function parseRecastUsages(content) {
  const usageRegex = /<(\w+)([^>]+)>/g;
  const usages = [];
  let match;
  while ((match = usageRegex.exec(content)) !== null) {
    const [, componentName, propsString] = match;
    const props = parseProps(propsString);
    usages.push({ componentName, props });
  }
  return usages;
}
function parseProps(propsString) {
  const props = {};
  const propsRegex = /(\w+)\s*=\s*({[^}]+}|"[^"]*"|{`[^`]+`}|\w+)/g;
  let match;
  while ((match = propsRegex.exec(propsString)) !== null) {
    const [, key, value] = match;
    if (key === "ref" || key === "className" || key === "style") {
      continue;
    }
    if (value.startsWith("{") && value.endsWith("}")) {
      try {
        const processedValue = value.replace(/'/g, '"').replace(/(\w+):/g, '"$1":').replace(/\s+/g, "").replace(/{{/g, "{").replace(/}}/g, "}");
        props[key] = JSON.parse(processedValue);
      } catch (e) {
        console.error(`Error parsing prop ${key}:`, e);
        props[key] = value;
      }
    } else if (value.startsWith('"') && value.endsWith('"')) {
      props[key] = value.slice(1, -1);
    } else {
      props[key] = value;
    }
  }
  return props;
}
function getFilePatterns(contentConfig) {
  if (typeof contentConfig === "string") {
    return [contentConfig];
  } else if (Array.isArray(contentConfig)) {
    return contentConfig.flatMap(getFilePatterns);
  } else if (typeof contentConfig === "object" && contentConfig !== null) {
    return getFilePatterns(contentConfig.files || []);
  }
  return [];
}
function addToSafelist(safelist, classes, prefix = "") {
  if (!prefix)
    return;
  if (typeof classes === "string") {
    classes.split(/\s+/).forEach((cls) => {
      safelist.add(`${prefix}:${cls}`);
    });
  } else if (Array.isArray(classes)) {
    classes.forEach((cls) => {
      safelist.add(`${prefix}:${cls}`);
    });
  } else if (typeof classes === "object" && classes !== null) {
    Object.entries(classes).forEach(([breakpoint, breakpointClasses]) => {
      if (breakpoint !== "default") {
        addToSafelist(safelist, breakpointClasses, breakpoint);
      }
    });
  }
}
var src_default = plugin(function({ addBase, config }) {
  console.log("Plugin version: 1.0.3");
  const safelist = /* @__PURE__ */ new Set();
  const components = {};
  const usages = [];
  const contentConfig = config("content");
  try {
    if (typeof contentConfig === "object" && contentConfig !== null && "files" in contentConfig && Array.isArray(contentConfig.files) && contentConfig.files.length > 0 && typeof contentConfig.files[0] === "object" && contentConfig.files[0].raw) {
      Object.assign(
        components,
        parseRecastComponents(contentConfig.files[0].raw)
      );
      usages.push(...parseRecastUsages(contentConfig.files[0].raw));
    } else {
      const filePatterns = getFilePatterns(contentConfig);
      filePatterns.forEach((pattern) => {
        const files = glob.sync(pattern);
        files.forEach((file) => {
          const content = fs.readFileSync(file, "utf8");
          Object.assign(components, parseRecastComponents(content));
          usages.push(...parseRecastUsages(content));
        });
      });
    }
  } catch (error) {
    console.error("Error processing content:", error);
  }
  usages.forEach((usage) => {
    const component = components[usage.componentName];
    if (!component)
      return;
    Object.entries(usage.props).forEach(([propName, propValue]) => {
      var _a;
      const variantGroup = (_a = component.variants) == null ? void 0 : _a[propName];
      if (!variantGroup)
        return;
      if (typeof propValue === "object" && propValue !== null) {
        Object.entries(propValue).forEach(([breakpoint, value]) => {
          if (breakpoint !== "default" && typeof value === "string") {
            const classes = variantGroup[value];
            if (classes) {
              addToSafelist(safelist, classes, breakpoint);
            }
          }
        });
      }
    });
  });
  const finalSafelist = Array.from(safelist).sort();
  debugLog("Final safelist", finalSafelist);
  config().safelist = finalSafelist;
});
export {
  src_default as default
};
//# sourceMappingURL=index.js.map