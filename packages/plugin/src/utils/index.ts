import { Parser } from "acorn";
import jsx from "acorn-jsx";

const JSXParser = Parser.extend(jsx());

export interface RecastComponent {
  base?: string | string[] | Record<string, string | string[]>;
  variants?: Record<
    string,
    Record<string, string | string[] | Record<string, string | string[]>>
  >;
}

export interface RecastUsage {
  componentName: string;
  props: Record<string, any>;
}

export function parseRecastComponents(
  content: string
): Record<string, RecastComponent> {
  const componentRegex =
    /(?:export\s+(?:const|default)|const)\s+(\w+)\s*=\s*recast\s*\(\s*\w+\s*,\s*({[\s\S]*?})\s*\)/g;
  const components: Record<string, RecastComponent> = {};

  let match;
  while ((match = componentRegex.exec(content)) !== null) {
    const [, componentName, componentDef] = match;
    try {
      const processedDef = componentDef
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')
        .replace(/'/g, '"')
        .replace(/,\s*}/g, "}")
        .replace(/\n/g, " ")
        .trim();
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

export function parseRecastUsages(content: string): RecastUsage[] {
  const usageRegex = /<(\w+)([^>]*)>/g;

  return Array.from(content.matchAll(usageRegex)).map(
    ([, componentName, propsString]) => {
      const cleanedPropsString = propsString.replace(/\s*\/$/, "").trim();
      const props = parseJSXExpression(cleanedPropsString);

      return { componentName, props };
    }
  );
}

function parseJSXExpression(str: string): any {
  try {
    const wrappedStr = `<dummy ${str} />`;
    const ast = JSXParser.parse(wrappedStr, { ecmaVersion: 2020 }) as any;

    const jsxOpeningElement = ast.body[0].expression.openingElement;

    const props: Record<string, any> = {};
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

function parseJSXAttributeValue(value: any): any {
  if (!value) return true;
  if (value.type === "Literal") return value.value;
  if (value.type === "JSXExpressionContainer") {
    return parseJSXExpressionValue(value.expression);
  }
  return null;
}

function parseJSXExpressionValue(expression: any): any {
  if (expression.type === "ObjectExpression") {
    const obj: Record<string, any> = {};
    for (const prop of expression.properties) {
      obj[prop.key.name] = parseJSXExpressionValue(prop.value);
    }
    return obj;
  }
  if (expression.type === "ArrayExpression") {
    return expression.elements.map(parseJSXExpressionValue);
  }
  if (expression.type === "Literal") return expression.value;
  if (expression.type === "Identifier") return expression.name;
  return null;
}

export function parseProps(propsString: string): Record<string, any> {
  try {
    // Wrap the props in a dummy JSX element
    const wrappedJSX = `<dummy ${propsString} />`;

    const ast = JSXParser.parse(wrappedJSX, {
      ecmaVersion: 2020,
      sourceType: "module",
    }) as any;

    // The parsed props will be in the attributes of the JSXOpeningElement
    const jsxElement = ast.body[0].expression;
    const attributes = jsxElement.openingElement.attributes;

    return parseJSXAttributes(attributes);
  } catch (error) {
    console.error("Error parsing props:", error);
    return {};
  }
}

function parseJSXAttributes(attributes: any[]): Record<string, any> {
  const result: Record<string, any> = {};

  for (const attr of attributes) {
    if (attr.type === "JSXAttribute") {
      const key = attr.name.name;
      const value = parseJSXAttributeValue(attr.value);
      result[key] = value;
    }
  }

  return result;
}

function parseObjectExpression(objectExpression: any): Record<string, any> {
  const result: Record<string, any> = {};

  for (const property of objectExpression.properties) {
    const key = property.key.name || property.key.value;
    const value = parseJSXExpressionValue(property.value);
    result[key] = value;
  }

  return result;
}

function parseExpression(expression: any): any {
  switch (expression.type) {
    case "Literal":
      return expression.value;
    case "ObjectExpression":
      return parseObjectExpression(expression);
    case "ArrayExpression":
      return expression.elements.map(parseExpression);
    case "JSXElement":
      // Handle JSX elements if needed
      return parseJSXElement(expression);
    case "Identifier":
      // For identifiers like `true`, `false`, `null`
      if (expression.name === "true") return true;
      if (expression.name === "false") return false;
      if (expression.name === "null") return null;
      return expression.name;
    default:
      console.warn(`Unhandled expression type: ${expression.type}`);
      return null;
  }
}

function parseJSXElement(element: any): any {
  // Implement JSX parsing if needed
  // This is a placeholder implementation
  return `<${element.openingElement.name.name} />`;
}

export function getFilePatterns(contentConfig: any): string[] {
  if (typeof contentConfig === "string") return [contentConfig];
  if (Array.isArray(contentConfig))
    return contentConfig.flatMap(getFilePatterns);
  if (typeof contentConfig === "object" && contentConfig !== null) {
    return getFilePatterns(contentConfig.files || []);
  }
  return [];
}

export function addToSafelist(
  safelist: Set<string>,
  classes: string | string[] | Record<string, string | string[]>,
  prefix: string = ""
): void {
  const addClassWithPrefix = (cls: string) => {
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
