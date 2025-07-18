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

// Global configuration for recast
interface RecastConfig {
  mergeFn?: MergeFn;
  performance?: {
    enableMonitoring?: boolean;
    cacheSize?: number;
  };
}

let globalConfig: RecastConfig = {};

/**
 * Configure global recast settings (e.g., merge function, performance options).
 */
export function configure(config: RecastConfig): void {
  if (Object.keys(config).length === 0) {
    globalConfig = {};
  } else {
    globalConfig = { ...globalConfig, ...config };
  }
}

interface RecastStylesObject<
  V extends { [K in keyof V]: { [S in keyof V[K]]: string | string[] } },
  M extends { [K in keyof M]: string | string[] },
> {
  /**
   * Apply styles to a React component.
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
   * Extract class names for given variant/modifier props.
   */
  extract(props: ExtractVariantProps<V> & ExtractModifierProps<M>): string | ClassNameRecord;

  /**
   * Internal: original style config for composition.
   */
  _config: RecastStyles<V, M, { cls?: ClassNameRecord }>;
}

/**
 * Create reusable, portable styles for components or direct class extraction.
 */
export function styles<
  V extends { [K in keyof V]: { [S in keyof V[K]]: string | string[] } },
  M extends { [K in keyof M]: string | string[] },
>(stylesConfig: RecastStyles<V, M, { cls?: ClassNameRecord }>): RecastStylesObject<V, M> {
  validateAndThrow(stylesConfig as RelaxedStyles);

  // Memoized helpers for extracting modifier/variant props
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

  // Curried function to apply styles to a component
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

  // Extract class names for given props
  const extract = (props: ExtractVariantProps<V> & ExtractModifierProps<M>): string | ClassNameRecord => {
    const modifierProps = processModifiers(props);
    const variantProps = processVariants(props);
    const { className, cls } = getRecastClasses({
      styles: stylesConfig as RelaxedStyles,
      variants: variantProps,
      modifiers: modifierProps,
    });
    return isEmptyObject(cls) ? className : cls;
  };

  const stylesObject = applyToComponent as RecastStylesObject<V, M>;
  stylesObject.extract = extract;
  stylesObject._config = stylesConfig;
  return stylesObject;
}

/**
 * Compose multiple style objects into one.
 */
function mergeStyleConfigsInternal(config1: RelaxedStyles, config2: RelaxedStyles): RelaxedStyles {
  const mergedConfig: RelaxedStyles = {
    base: (() => {
      if (config1.base && config2.base) {
        const base1 = isString(config1.base) ? config1.base : (config1.base as string[]).join(" ");
        const base2 = isString(config2.base) ? config2.base : (config2.base as string[]).join(" ");
        return `${base1} ${base2}`.trim();
      }
      return config2.base || config1.base;
    })(),
    variants: (() => {
      if (!config1.variants && !config2.variants) return undefined;
      return {
        ...config1.variants,
        ...config2.variants,
      };
    })(),
    modifiers: (() => {
      if (!config1.modifiers && !config2.modifiers) return undefined;
      return {
        ...config1.modifiers,
        ...config2.modifiers,
      };
    })(),
    defaults: (() => {
      if (!config1.defaults && !config2.defaults) return undefined;
      const mergedDefaults: RelaxedDefaults = {};
      if (config1.defaults?.variants || config2.defaults?.variants) {
        mergedDefaults.variants = {
          ...config1.defaults?.variants,
          ...config2.defaults?.variants,
        };
      }
      if (config1.defaults?.modifiers || config2.defaults?.modifiers) {
        mergedDefaults.modifiers = mergeArrays(config1.defaults?.modifiers, config2.defaults?.modifiers);
      }
      return Object.keys(mergedDefaults).length > 0 ? mergedDefaults : undefined;
    })(),
    conditionals: (() => {
      if (!config1.conditionals && !config2.conditionals) return undefined;
      return mergeArrays(config1.conditionals, config2.conditionals);
    })(),
  };
  Object.keys(mergedConfig).forEach((key) => {
    if (mergedConfig[key as keyof typeof mergedConfig] === undefined) {
      delete mergedConfig[key as keyof typeof mergedConfig];
    }
  });
  return mergedConfig;
}

const mergeStyleConfigs = memoize(mergeStyleConfigsInternal);

/**
 * Compose multiple style objects into a single style object.
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
  let mergedConfig = styleObjects[0]!._config as RelaxedStyles;
  for (let i = 1; i < styleObjects.length; i++) {
    mergedConfig = mergeStyleConfigs(mergedConfig, styleObjects[i]!._config as RelaxedStyles);
  }
  return styles(mergedConfig) as T;
}

/**
 * Main recast API: styles, compose, configure.
 */
export const recast = {
  styles,
  compose,
  configure,
};
