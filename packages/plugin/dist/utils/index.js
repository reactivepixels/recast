// src/utils/index.ts
import { Parser } from "acorn";
import jsx from "acorn-jsx";
var JSXParser = Parser.extend(jsx());
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
    ([, componentName, propsString]) => {
      const cleanedPropsString = propsString.replace(/\s*\/$/, "").trim();
      const props = parseJSXExpression(cleanedPropsString);
      return { componentName, props };
    }
  );
}
function parseJSXExpression(str) {
  try {
    const wrappedStr = `<dummy ${str} />`;
    const ast = JSXParser.parse(wrappedStr, { ecmaVersion: 2020 });
    const jsxOpeningElement = ast.body[0].expression.openingElement;
    const props = {};
    for (const attr of jsxOpeningElement.attributes) {
      if (attr.type === "JSXAttribute") {
        const key = attr.name.name;
        const value = parseJSXAttributeValue(attr.value);
        props[key] = value;
      }
    }
    return props;
  } catch (error) {
    return {};
  }
}
function parseJSXAttributeValue(value) {
  if (!value)
    return true;
  if (value.type === "Literal")
    return value.value;
  if (value.type === "JSXExpressionContainer") {
    return parseJSXExpressionValue(value.expression);
  }
  return null;
}
function parseJSXExpressionValue(expression) {
  if (expression.type === "ObjectExpression") {
    const obj = {};
    for (const prop of expression.properties) {
      obj[prop.key.name] = parseJSXExpressionValue(prop.value);
    }
    return obj;
  }
  if (expression.type === "ArrayExpression") {
    return expression.elements.map(parseJSXExpressionValue);
  }
  if (expression.type === "Literal")
    return expression.value;
  if (expression.type === "Identifier")
    return expression.name;
  return null;
}
function parseProps(propsString) {
  try {
    const wrappedJSX = `<dummy ${propsString} />`;
    const ast = JSXParser.parse(wrappedJSX, {
      ecmaVersion: 2020,
      sourceType: "module"
    });
    const jsxElement = ast.body[0].expression;
    const attributes = jsxElement.openingElement.attributes;
    return parseJSXAttributes(attributes);
  } catch (error) {
    console.error("Error parsing props:", error);
    return {};
  }
}
function parseJSXAttributes(attributes) {
  const result = {};
  for (const attr of attributes) {
    if (attr.type === "JSXAttribute") {
      const key = attr.name.name;
      const value = parseJSXAttributeValue(attr.value);
      result[key] = value;
    }
  }
  return result;
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
  const addClassWithPrefix = (cls) => {
    const safelistItem = prefix ? `${prefix}:${cls}` : cls;
    safelist.add(safelistItem);
  };
  if (typeof classes === "string") {
    classes.split(/\s+/).forEach(addClassWithPrefix);
  } else if (Array.isArray(classes)) {
    classes.forEach(addClassWithPrefix);
  } else if (typeof classes === "object" && classes !== null) {
    Object.values(classes).forEach((value) => {
      if (typeof value === "string") {
        addClassWithPrefix(value);
      } else if (Array.isArray(value)) {
        value.forEach(addClassWithPrefix);
      }
    });
  }
}
export {
  addToSafelist,
  getFilePatterns,
  parseProps,
  parseRecastComponents,
  parseRecastUsages
};
//# sourceMappingURL=index.js.map