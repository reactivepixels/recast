import React, { forwardRef } from "react";
import type {
  RecastProps,
  RecastStyles,
  MergeFn,
  ExtractModifierProps,
  ExtractVariantProps,
  RelaxedStyles,
  RelaxedVariantProps,
  RelaxedModifierProps,
  ClassNameRecord,
} from "./types.js";
import { getRecastClasses } from "./utils/getRecastClasses.js";
import { omit, isEmptyObject, isString } from "./utils/common.js";

// Global configuration
interface RecastConfig {
  mergeFn?: MergeFn;
}

let globalConfig: RecastConfig = {};

/**
 * Configure global defaults for recast
 */
export function configure(config: RecastConfig): void {
  // If config is empty object, reset to default config
  if (Object.keys(config).length === 0) {
    globalConfig = {};
  } else {
    globalConfig = { ...globalConfig, ...config };
  }
}

/**
 * Interface for the styles object returned by recast.styles()
 */
interface RecastStylesObject<
  V extends { [K in keyof V]: { [S in keyof V[K]]: string | string[] } },
  M extends { [K in keyof M]: string | string[] },
> {
  /**
   * Apply styles to a React component
   */
  <ComponentProps extends RecastProps<ComponentProps>>(
    Component: React.ComponentType<ComponentProps>,
    mergeFn?: MergeFn,
  ): React.ForwardRefExoticComponent<
    Omit<ComponentProps, keyof ExtractVariantProps<V> | keyof ExtractModifierProps<M>> &
      ExtractVariantProps<V> &
      ExtractModifierProps<M> & { className?: string } & React.RefAttributes<React.ElementRef<typeof Component>>
  >;

  /**
   * Extract class names without applying to a component
   */
  extract(props: ExtractVariantProps<V> & ExtractModifierProps<M>): string | ClassNameRecord;

  /**
   * Internal property to store the original style configuration for composition
   * @internal
   */
  _config: RecastStyles<V, M, { cls?: ClassNameRecord }>;
}

/**
 * Creates reusable, portable styles that can be applied to components or extracted as class names
 */
export function styles<
  V extends { [K in keyof V]: { [S in keyof V[K]]: string | string[] } },
  M extends { [K in keyof M]: string | string[] },
>(stylesConfig: RecastStyles<V, M, { cls?: ClassNameRecord }>): RecastStylesObject<V, M> {
  const processModifiers = (props: Record<string, unknown>): RelaxedModifierProps => {
    const modifierKeys = Object.keys(stylesConfig.modifiers || {});
    return modifierKeys.reduce<RelaxedModifierProps>((acc, key) => {
      const value = props[key as keyof typeof props];
      if (typeof value === "boolean") {
        acc[key] = value;
      }
      return acc;
    }, {});
  };

  const processVariants = (props: Record<string, unknown>): RelaxedVariantProps => {
    const variantKeys = Object.keys(stylesConfig.variants || {});
    return variantKeys.reduce<RelaxedVariantProps>((acc, key) => {
      const value = props[key as keyof typeof props];
      if (value !== undefined && isString(value)) {
        acc[key] = value as string;
      }
      return acc;
    }, {});
  };

  // Create the callable function for applying to components
  const applyToComponent = <ComponentProps extends RecastProps<ComponentProps>>(
    Component: React.ComponentType<ComponentProps>,
    mergeFn?: MergeFn,
  ) => {
    type Props = Omit<ComponentProps, keyof ExtractVariantProps<V> | keyof ExtractModifierProps<M>> &
      ExtractVariantProps<V> &
      ExtractModifierProps<M> & { className?: string };

    const ComponentWithThemedProps = forwardRef<React.ElementRef<typeof Component>, Props>((props, ref) => {
      const { className, ...restProps } = props as Props;

      const modifierProps = processModifiers(restProps);
      const variantProps = processVariants(restProps);

      const propsWithoutModifiersAndVariants = omit(
        [...Object.keys(modifierProps), ...Object.keys(variantProps), "className"],
        restProps,
      );

      const { className: recastClassesClassName, cls } = getRecastClasses({
        styles: stylesConfig as RelaxedStyles,
        variants: variantProps,
        modifiers: modifierProps,
      });

      const finalMergeFn = mergeFn || globalConfig.mergeFn;
      const mergedClassName = finalMergeFn
        ? finalMergeFn(recastClassesClassName, className)
        : `${recastClassesClassName} ${className || ""}`.trim();

      return (
        <Component
          {...(propsWithoutModifiersAndVariants as ComponentProps)}
          ref={ref}
          className={mergedClassName}
          cls={isEmptyObject(cls) ? undefined : cls}
        />
      );
    });

    ComponentWithThemedProps.displayName = `Recast(${Component.displayName || Component.name || "Component"})`;

    return ComponentWithThemedProps;
  };

  // Create the extract function for getting class names directly
  const extract = (props: ExtractVariantProps<V> & ExtractModifierProps<M>): string | ClassNameRecord => {
    const modifierProps = processModifiers(props);
    const variantProps = processVariants(props);

    const { className, cls } = getRecastClasses({
      styles: stylesConfig as RelaxedStyles,
      variants: variantProps,
      modifiers: modifierProps,
    });

    // If cls is empty, return just the className string
    // Otherwise return the cls object for nested components
    return isEmptyObject(cls) ? className : cls;
  };

  // Create the styles object that is both callable and has extract method
  const stylesObject = applyToComponent as RecastStylesObject<V, M>;
  stylesObject.extract = extract;
  stylesObject._config = stylesConfig; // Store original config for composition

  return stylesObject;
}

/**
 * Type for any style object created by recast.styles()
 */
type AnyRecastStylesObject = RecastStylesObject<
  Record<string, Record<string, string | string[]>>,
  Record<string, string | string[]>
>;

/**
 * Composes multiple style objects into a single style object
 */
export function compose(styleObjects: AnyRecastStylesObject[]): AnyRecastStylesObject {
  if (!styleObjects.length) {
    throw new Error("recast.compose() requires at least one style object");
  }

  if (styleObjects.length === 1) {
    return styleObjects[0]!;
  }

  // TODO: Implement actual merging logic
  // For now, just return the first style object
  console.warn("recast.compose() merging logic not yet implemented, returning first object");
  return styleObjects[0]!;
}

/**
 * Main recast object with styles method and configure
 */
export const recast = {
  styles,
  compose,
  configure,
};
