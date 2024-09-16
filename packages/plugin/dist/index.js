// src/index.ts
import plugin from "tailwindcss/plugin";
import fs from "fs";
import { glob } from "glob";

// src/utils/index.ts
function parseRecastComponents(content) {
  const componentRegex = /(?:export\s+(?:const|default)|const)\s+(\w+)\s*=\s*recast\s*\(\s*\w+\s*,\s*({[\s\S]*?})\s*\)/g;
  const components = {};
  let match;
  while ((match = componentRegex.exec(content)) !== null) {
    const [, componentName, componentDef] = match;
    try {
      const processedDef = componentDef.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ').replace(/'/g, '"').replace(/,\s*}/g, "}").replace(/\n/g, " ").trim();
      components[componentName] = JSON.parse(processedDef);
    } catch (e) {
      console.error(`Error parsing component ${componentName}:`, e);
    }
  }
  const defaultExportRegex = /export\s+default\s+(\w+)/;
  const defaultExportMatch = content.match(defaultExportRegex);
  if (defaultExportMatch) {
    const componentName = defaultExportMatch[1];
    if (components[componentName]) {
      components["default"] = components[componentName];
    }
  }
  return components;
}
function parseRecastUsages(content) {
  const usageRegex = /<(\w+)([^>]*)>/g;
  return Array.from(content.matchAll(usageRegex)).map(
    ([, componentName, propsString]) => ({
      componentName,
      props: parseProps(propsString)
    })
  );
}
function parseProps(propsString) {
  const props = {};
  const propsRegex = /(\w+)\s*=\s*({[^}]+}|"[^"]*"|{`[^`]+`}|\w+|{true}|{false})/g;
  for (const [, key, value] of propsString.matchAll(propsRegex)) {
    if (["ref", "className", "style"].includes(key))
      continue;
    if (value.startsWith("{") && value.endsWith("}")) {
      if (value === "{true}") {
        props[key] = true;
      } else if (value === "{false}") {
        props[key] = false;
      } else {
        try {
          const processedValue = value.replace(/'/g, '"').replace(/(\w+):/g, '"$1":').replace(/\s+/g, "").replace(/{{/g, "{").replace(/}}/g, "}");
          props[key] = JSON.parse(processedValue);
        } catch (e) {
          console.error(`Error parsing prop ${key}:`, e);
          props[key] = value;
        }
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
  if (typeof contentConfig === "string")
    return [contentConfig];
  if (Array.isArray(contentConfig))
    return contentConfig.flatMap(getFilePatterns);
  if (typeof contentConfig === "object" && contentConfig !== null) {
    return getFilePatterns(contentConfig.files || []);
  }
  return [];
}
function addToSafelist(safelist, classes, prefix = "") {
  if (!prefix)
    return;
  const addClassWithPrefix = (cls) => safelist.add(`${prefix}:${cls}`);
  if (typeof classes === "string") {
    classes.split(/\s+/).forEach(addClassWithPrefix);
  } else if (Array.isArray(classes)) {
    classes.forEach(addClassWithPrefix);
  } else if (typeof classes === "object" && classes !== null) {
    Object.entries(classes).forEach(([breakpoint, breakpointClasses]) => {
      if (breakpoint !== "default") {
        addToSafelist(safelist, breakpointClasses, breakpoint);
      }
    });
  }
}

// src/index.ts
var src_default = plugin(function({ config }) {
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
  config().safelist = Array.from(safelist);
});
export {
  src_default as default
};
//# sourceMappingURL=index.js.map