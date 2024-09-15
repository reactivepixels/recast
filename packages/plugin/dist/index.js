// src/index.ts
import plugin from "tailwindcss/plugin";
import fs from "fs";
import { glob } from "glob";
function parseRecastComponents(content) {
  const regex = /recast\(\w+,\s*({[\s\S]*?})\)/g;
  const components = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const componentDef = match[1];
    const componentObj = Function(`return ${componentDef}`)();
    components.push({
      base: componentObj.base || [],
      variants: componentObj.variants || {},
      breakpoints: componentObj.breakpoints || []
    });
  }
  return components;
}
function addUnique(arr, item) {
  if (!arr.includes(item)) {
    arr.push(item);
  }
}
function addClassesToSafelist(safelist, classes, prefix = "", breakpoints) {
  const addClass = (cls) => {
    const existingPrefix = cls.split(":")[0];
    if (breakpoints.includes(existingPrefix)) {
      addUnique(safelist, cls);
    } else {
      const prefixedClass = prefix ? `${prefix}:${cls}` : cls;
      addUnique(safelist, prefixedClass);
    }
  };
  if (typeof classes === "string") {
    classes.split(/\s+/).forEach(addClass);
  } else if (Array.isArray(classes)) {
    classes.forEach((cls) => {
      if (typeof cls === "string") {
        cls.split(/\s+/).forEach(addClass);
      }
    });
  }
}
function getFilePatterns(content) {
  if (typeof content === "string") {
    return [content];
  } else if (Array.isArray(content)) {
    return content.flatMap((item) => getFilePatterns(item));
  } else if (typeof content === "object" && content !== null) {
    return getFilePatterns(content.files || []);
  }
  return [];
}
var src_default = plugin(function({ config }) {
  const safelist = [];
  const contentConfig = config("content");
  const options = {
    ignore: ["**/node_modules/**", "**/build/**", "**/dist/**"]
  };
  const filePatterns = getFilePatterns(contentConfig);
  filePatterns.forEach((pattern) => {
    const matchingFiles = glob.sync(pattern, options);
    matchingFiles.forEach((file) => {
      const content = fs.readFileSync(file, "utf8");
      const recastComponents = parseRecastComponents(content);
      recastComponents.forEach((component) => {
        const { base, variants, breakpoints } = component;
        addClassesToSafelist(safelist, base, "", breakpoints);
        Object.values(variants).forEach((variantGroup) => {
          Object.values(variantGroup).forEach((classes) => {
            addClassesToSafelist(safelist, classes, "", breakpoints);
          });
        });
        breakpoints.forEach((breakpoint) => {
          addClassesToSafelist(safelist, base, breakpoint, breakpoints);
          Object.values(variants).forEach((variantGroup) => {
            Object.values(variantGroup).forEach((classes) => {
              addClassesToSafelist(safelist, classes, breakpoint, breakpoints);
            });
          });
        });
      });
    });
  });
  const existingSafelist = config("safelist") || [];
  const combinedSafelist = existingSafelist.concat(safelist);
  config().safelist = combinedSafelist.filter(
    (item, index) => combinedSafelist.indexOf(item) === index
  );
});
export {
  src_default as default
};
//# sourceMappingURL=index.js.map