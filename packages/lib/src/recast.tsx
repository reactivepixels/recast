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
  RelaxedDefaults,
  ClassNameRecord,
} from "./types.js";
import { getRecastClasses } from "./utils/getRecastClasses.js";
import { omit, isEmptyObject, isString, mergeArrays, memoize } from "./utils/common.js";
import { validateAndThrow } from "./utils/validateStyles.js";

// Global configuration
interface RecastConfig {
  mergeFn?: MergeFn;
  performance?: {
    enableMonitoring?: boolean;
    cacheSize?: number;
  };
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
  // Validate styles in development mode
  validateAndThrow(stylesConfig as RelaxedStyles);

  // Memoize the modifier and variant processing functions for better performance
  const processModifiers = memoize((props: Record<string, unknown>): RelaxedModifierProps => {
    const modifierKeys = Object.keys(stylesConfig.modifiers || {});
    return modifierKeys.reduce<RelaxedModifierProps>((acc, key) => {
      const value = props[key as keyof typeof props];
      if (typeof value === "boolean") {
        acc[key] = value;
      }
      return acc;
    }, {});
  });

  const processVariants = memoize((props: Record<string, unknown>): RelaxedVariantProps => {
    const variantKeys = Object.keys(stylesConfig.variants || {});
    return variantKeys.reduce<RelaxedVariantProps>((acc, key) => {
      const value = props[key as keyof typeof props];
      if (value !== undefined && isString(value)) {
        acc[key] = value as string;
      }
      return acc;
    }, {});
  });

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
 * Internal unmemoized version of mergeStyleConfigs
 */
function mergeStyleConfigsInternal(config1: RelaxedStyles, config2: RelaxedStyles): RelaxedStyles {
  const mergedConfig: RelaxedStyles = {
    // Merge base - concatenate if both are strings, take second if only one exists
    base: (() => {
      if (config1.base && config2.base) {
        const base1 = isString(config1.base) ? config1.base : (config1.base as string[]).join(" ");
        const base2 = isString(config2.base) ? config2.base : (config2.base as string[]).join(" ");
        return `${base1} ${base2}`.trim();
      }
      return config2.base || config1.base;
    })(),

    // Merge variants - combine variant groups, later overrides earlier for same keys
    variants: (() => {
      if (!config1.variants && !config2.variants) return undefined;
      return {
        ...config1.variants,
        ...config2.variants,
      };
    })(),

    // Merge modifiers - combine modifier groups, later overrides earlier for same keys
    modifiers: (() => {
      if (!config1.modifiers && !config2.modifiers) return undefined;
      return {
        ...config1.modifiers,
        ...config2.modifiers,
      };
    })(),

    // Merge defaults - combine defaults, later overrides earlier for same keys
    defaults: (() => {
      if (!config1.defaults && !config2.defaults) return undefined;

      const mergedDefaults: RelaxedDefaults = {};

      // Merge variant defaults
      if (config1.defaults?.variants || config2.defaults?.variants) {
        mergedDefaults.variants = {
          ...config1.defaults?.variants,
          ...config2.defaults?.variants,
        };
      }

      // Merge modifier defaults
      if (config1.defaults?.modifiers || config2.defaults?.modifiers) {
        mergedDefaults.modifiers = mergeArrays(config1.defaults?.modifiers, config2.defaults?.modifiers);
      }

      return Object.keys(mergedDefaults).length > 0 ? mergedDefaults : undefined;
    })(),

    // Merge conditionals - concatenate arrays
    conditionals: (() => {
      if (!config1.conditionals && !config2.conditionals) return undefined;
      return mergeArrays(config1.conditionals, config2.conditionals);
    })(),
  };

  // Remove undefined properties
  Object.keys(mergedConfig).forEach((key) => {
    if (mergedConfig[key as keyof typeof mergedConfig] === undefined) {
      delete mergedConfig[key as keyof typeof mergedConfig];
    }
  });

  return mergedConfig;
}

/**
 * Memoized version of mergeStyleConfigs for optimal performance.
 * Merges two style configurations, with the second config taking precedence.
 * This is memoized because style composition can happen frequently with the same inputs.
 */
const mergeStyleConfigs = memoize(mergeStyleConfigsInternal);

/**
 * Composes multiple style objects into a single style object
 */
export function compose<
  T extends RecastStylesObject<Record<string, Record<string, string | string[]>>, Record<string, string | string[]>>,
>(styleObjects: T[]): T {
  if (!styleObjects.length) {
    throw new Error("recast.compose() requires at least one style object");
  }

  if (styleObjects.length === 1) {
    return styleObjects[0]!;
  }

  // Start with the first style object's config
  let mergedConfig = styleObjects[0]!._config as RelaxedStyles;

  // Merge each subsequent config
  for (let i = 1; i < styleObjects.length; i++) {
    mergedConfig = mergeStyleConfigs(mergedConfig, styleObjects[i]!._config as RelaxedStyles);
  }

  // Create a new styles object with the merged config
  return styles(mergedConfig) as T;
}

/**
 * Main recast object with styles method and configure
 */
export const recast = {
  styles,
  compose,
  configure,
};
