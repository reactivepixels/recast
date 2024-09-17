import React, { forwardRef } from "react";
import {
  RecastProps,
  RecastStyles,
  MergeFn,
  ExtractModifierProps,
  ExtractVariantProps,
  ResponsiveValue,
  RelaxedStyles,
  RelaxedVariantProps,
  RelaxedModifierProps,
} from "./types.js";
import { getRecastClasses } from "./utils/getRecastClasses.js";
import { omit, isEmptyObject, isString, isNonNullObject } from "./utils/common.js";

/**
 * Creates a new component with theming capabilities based on the provided component and styles.
 *
 * @template P - The props of the base component
 * @template V - The variant styles object
 * @template M - The modifier styles object
 * @param {React.ComponentType<P>} Component - The base component to be themed
 * @param {RecastStyles<V, M, Pick<P, "rcx">>} styles - The styles configuration object
 * @param {MergeFn} [mergeFn] - Optional function to merge classNames
 * @returns {React.ForwardRefExoticComponent<React.PropsWithoutRef<Props> & React.RefAttributes<React.ElementRef<typeof Component>>>} - A new component with theming capabilities
 */
export function recast<
  P extends RecastProps<P>,
  V extends { [K in keyof V]: { [S in keyof V[K]]: string | string[] } },
  M extends { [K in keyof M]: string | string[] },
>(Component: React.ComponentType<P>, styles: RecastStyles<V, M, Pick<P, "rcx">>, mergeFn?: MergeFn) {
  type Props = Omit<P, keyof ExtractVariantProps<V> | keyof ExtractModifierProps<M>> &
    ExtractVariantProps<V> &
    ExtractModifierProps<M> & { className?: string };

  const ComponentWithThemedProps = forwardRef<React.ElementRef<typeof Component>, Props>((props, ref) => {
    const { className, ...restProps } = props as Props;

    const modifierKeys = Object.keys(styles.modifiers || {});
    const modifierProps = modifierKeys.reduce<RelaxedModifierProps>((acc, key) => {
      const value = restProps[key as keyof typeof restProps];
      if (typeof value === "boolean" || isNonNullObject(value)) {
        acc[key] = value as boolean | ResponsiveValue<boolean>;
      }
      return acc;
    }, {});

    const variantKeys = Object.keys(styles.variants || {});
    const variantProps = variantKeys.reduce<RelaxedVariantProps>((acc, key) => {
      const value = restProps[key as keyof typeof restProps];
      if (value !== undefined && (isString(value) || isNonNullObject(value))) {
        acc[key] = value as ResponsiveValue<string>;
      }
      return acc;
    }, {});

    const propsWithoutModifiersAndVariants = omit([...modifierKeys, ...variantKeys, "className"], restProps);

    const { className: recastClassesClassName, rcx } = getRecastClasses({
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
        rcx={isEmptyObject(rcx) ? undefined : rcx}
      />
    );
  });

  ComponentWithThemedProps.displayName = `Recast(${Component.displayName || Component.name || "Component"})`;

  return ComponentWithThemedProps;
}
