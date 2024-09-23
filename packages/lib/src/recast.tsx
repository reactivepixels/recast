import React, { forwardRef } from "react";
import type {
  RecastProps,
  RecastStyles,
  MergeFn,
  ExtractModifierProps,
  ExtractVariantProps,
  ResponsiveValue,
  RelaxedStyles,
  RelaxedVariantProps,
  RelaxedModifierProps,
  RecastBreakpoints,
} from "./types.js";
import { getRecastClasses } from "./utils/getRecastClasses.js";
import { omit, isEmptyObject, isString, isNonNullObject } from "./utils/common.js";

/**
 * Creates a new component with theming capabilities.
 *
 * @template P - The props of the base component
 * @template V - The variant options
 * @template M - The modifier options
 * @template B - The breakpoint options
 * @param {React.ComponentType<P>} Component - The base component to add theming to
 * @param {RecastStyles<V, M, Pick<P, "rcx">, B>} styles - The styles to apply to the component
 * @param {MergeFn} [mergeFn] - Optional function to merge props
 * @returns {RecastComponent<P, V, M, B>} A new component with theming capabilities
 */
export function recast<
  P extends RecastProps<P>,
  V extends { [K in keyof V]: { [S in keyof V[K]]: string | string[] } },
  M extends { [K in keyof M]: string | string[] },
  B extends keyof RecastBreakpoints | never = never,
>(Component: React.ComponentType<P>, styles: RecastStyles<V, M, Pick<P, "rcx">, B>, mergeFn?: MergeFn) {
  type Props = Omit<P, keyof ExtractVariantProps<V, B> | keyof ExtractModifierProps<M>> &
    ExtractVariantProps<V, B> &
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

  const processVariants = (props: Record<string, unknown>): RelaxedVariantProps<B> => {
    const variantKeys = Object.keys(styles.variants || {});
    return variantKeys.reduce<RelaxedVariantProps<B>>((acc, key) => {
      const value = props[key as keyof typeof props];
      if (value !== undefined && (isString(value) || isNonNullObject(value))) {
        acc[key] = value as ResponsiveValue<B, string>;
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

    const { className: recastClassesClassName, rcx } = getRecastClasses<B>({
      styles: styles as RelaxedStyles<B>,
      variants: variantProps,
      modifiers: modifierProps,
      breakpoints: styles.breakpoints,
    });

    const mergedClassName = mergeFn
      ? mergeFn(recastClassesClassName, className)
      : `${recastClassesClassName} ${className || ""}`.trim();

    return (
      <Component
        {...(propsWithoutModifiersAndVariants as P)}
        ref={ref}
        className={mergedClassName}
        rcx={isEmptyObject(rcx) ? undefined : rcx}
      />
    );
  });

  ComponentWithThemedProps.displayName = `Recast(${Component.displayName || Component.name || "Component"})`;

  return ComponentWithThemedProps;
}
