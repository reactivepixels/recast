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
} from "./types.js";
import { getRecastClasses } from "./utils/getRecastClasses.js";
import { omit, isEmptyObject, isString } from "./utils/common.js";

/**
 * Creates a new component with theming capabilities.
 *
 * @template P - The props of the base component
 * @template V - The variant options
 * @template M - The modifier options
 * @param {React.ComponentType<P>} Component - The base component to add theming to
 * @param {RecastStyles<V, M, Pick<P, "cls">>} styles - The styles to apply to the component
 * @param {MergeFn} [mergeFn] - Optional function to merge props
 * @returns {RecastComponent<P, V, M>} A new component with theming capabilities
 */
export function recast<
  P extends RecastProps<P>,
  V extends { [K in keyof V]: { [S in keyof V[K]]: string | string[] } },
  M extends { [K in keyof M]: string | string[] },
>(Component: React.ComponentType<P>, styles: RecastStyles<V, M, Pick<P, "cls">>, mergeFn?: MergeFn) {
  type Props = Omit<P, keyof ExtractVariantProps<V> | keyof ExtractModifierProps<M>> &
    ExtractVariantProps<V> &
    ExtractModifierProps<M> & { className?: string };

  const processModifiers = (props: Record<string, unknown>): RelaxedModifierProps => {
    const modifierKeys = Object.keys(styles.modifiers || {});
    return modifierKeys.reduce<RelaxedModifierProps>((acc, key) => {
      const value = props[key as keyof typeof props];
      if (typeof value === "boolean") {
        acc[key] = value;
      }
      return acc;
    }, {});
  };

  const processVariants = (props: Record<string, unknown>): RelaxedVariantProps => {
    const variantKeys = Object.keys(styles.variants || {});
    return variantKeys.reduce<RelaxedVariantProps>((acc, key) => {
      const value = props[key as keyof typeof props];
      if (value !== undefined && isString(value)) {
        acc[key] = value as string;
      }
      return acc;
    }, {});
  };

  const ComponentWithThemedProps = forwardRef<React.ElementRef<typeof Component>, Props>((props, ref) => {
    const { className, ...restProps } = props as Props;

    const modifierProps = processModifiers(restProps);
    const variantProps = processVariants(restProps);

    const propsWithoutModifiersAndVariants = omit(
      [...Object.keys(modifierProps), ...Object.keys(variantProps), "className"],
      restProps,
    );

    const { className: recastClassesClassName, cls } = getRecastClasses({
      styles: styles as RelaxedStyles,
      variants: variantProps,
      modifiers: modifierProps,
    });

    const mergedClassName = mergeFn
      ? mergeFn(recastClassesClassName, className)
      : `${recastClassesClassName} ${className || ""}`.trim();

    return (
      <Component
        {...(propsWithoutModifiersAndVariants as P)}
        ref={ref}
        className={mergedClassName}
        cls={isEmptyObject(cls) ? undefined : cls}
      />
    );
  });

  ComponentWithThemedProps.displayName = `Recast(${Component.displayName || Component.name || "Component"})`;

  return ComponentWithThemedProps;
}
